import React, { useState } from 'react';
import { MDBBtn, MDBInput, MDBTextArea, MDBIcon } from "mdb-react-ui-kit";
import UploadFile from "../../components/UploadFile";
import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../services/product_api";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useGetCategoryListQuery } from '../../services/category_api';
import { useParams } from 'react-router-dom';

// Define validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    category_id: Yup.string().required('Category is required'),
    price: Yup.number().required('Price is required').min(0, 'Price must be greater than or equal to 0'),
    product_image_url: Yup.string().required('Product image is required'),
    color: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Color name is required'),
            qty: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
        })
    ).min(1, 'At least one color is required'),
    product_size: Yup.array().of(
        Yup.string().oneOf(['XS', 'S', 'M', 'L', 'XL', 'XXL'], 'Invalid size')
    ).min(1, 'At least one size is required'),
    description: Yup.string().required('Description is required'),
});

export default function UpdateProduct() {
    const params = useParams();
    const product_id = params.product_id;

    // Fetching product details and categories
    const { data: productDetails, isLoading: isProductLoading, error: productError } = useGetProductDetailsQuery(product_id);
    const { data: categoryDetails, isLoading: isCategoryLoading, error: categoryError } = useGetCategoryListQuery();

    const [updateProduct] = useUpdateProductMutation();

    const [currentImageUrl, setCurrentImageUrl] = useState('');

    const initialProduct = productDetails ? {
        name: productDetails.name || '',
        category_id: productDetails.category_id || '',
        price: productDetails.price || 0,
        color: productDetails.color || [{ name: '', qty: 1 }],
        product_size: productDetails.product_size || [],
        description: productDetails.description || '',
        product_image_url: productDetails.product_image_url || ''
    } : {};

    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log("Submitted values:", values);
            await updateProduct({ ...values, id: product_id }).unwrap();
            toast.success('Product updated successfully');
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.data?.msg || 'Failed to update product');
        }
    };

    if (isProductLoading || isCategoryLoading) return <p>Loading...</p>;
    if (productError) return <p className="text-danger">Error loading product details</p>;
    if (categoryError) return <p className="text-danger">Error loading categories</p>;

    return (
        <div className="update-product w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Update Product</h6>
            <Formik
                initialValues={initialProduct}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Field
                            as={MDBInput}
                            name="name"
                            type="text"
                            label="Product Name"
                            className="mb-3"
                        />
                        <ErrorMessage name="name" component="div" className="text-danger" />

                        <div className="mb-3">
                            <p className="mb-0 small">Select Category</p>
                            <Field as="select" name="category_id" className="form-control">
                                <option value="">Select a category</option>
                                {categoryDetails && categoryDetails.categories?.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category_id" component="div" className="text-danger" />
                        </div>

                        <Field
                            as={MDBInput}
                            name="price"
                            type="number"
                            label="Product Price"
                            className="mb-3"
                        />
                        <ErrorMessage name="price" component="div" className="text-danger" />

                        <div className="mb-3">
                            <p className="mb-0 small">Product Image</p>
                            <div className="my-3 d-flex justify-content-around align-items-center">
                                <img
                                    src={currentImageUrl || productDetails.product_image_url || 'https://mdbootstrap.com/img/new/standard/city/041.webp'}
                                    className='w-50'
                                    alt='Product'
                                />
                                <MDBIcon far icon="trash-alt" color="danger" onClick={() => setCurrentImageUrl('')} />
                            </div>
                            <UploadFile setDownloadUrl={(url) => setFieldValue('product_image_url', url)} />
                            <ErrorMessage name="product_image_url" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Product Color</p>
                            <FieldArray name="color">
                                {({ push, remove }) => (
                                    <div>
                                        {values.color.map((color, index) => (
                                            <div key={index} className="mb-2">
                                                <Field
                                                    name={`color[${index}].name`}
                                                    placeholder="Color name"
                                                    className="form-control mb-2"
                                                />
                                                <ErrorMessage name={`color[${index}].name`} component="div" className="text-danger" />
                                                <Field
                                                    name={`color[${index}].qty`}
                                                    type="number"
                                                    placeholder="Quantity"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name={`color[${index}].qty`} component="div" className="text-danger" />
                                                <MDBBtn
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    color="danger"
                                                    size="sm"
                                                >
                                                    Remove
                                                </MDBBtn>
                                            </div>
                                        ))}
                                        <MDBBtn
                                            type="button"
                                            onClick={() => push({ name: '', qty: 1 })}
                                            size="sm"
                                        >
                                            Add Color
                                        </MDBBtn>
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <div className="mb-3">
                            <p className="mb-0 small">Product Size</p>
                            <Field as="select" name="product_size" multiple className="form-control">
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </Field>
                            <ErrorMessage name="product_size" component="div" className="text-danger" />
                        </div>

                        <Field
                            as={MDBTextArea}
                            name="description"
                            rows={5}
                            label="Product Description"
                            className="mb-3"
                        />
                        <ErrorMessage name="description" component="div" className="text-danger" />

                        <MDBBtn type="submit" block>Update Product</MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
