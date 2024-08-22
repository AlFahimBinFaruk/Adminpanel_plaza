import React, { useState } from 'react';
import { MDBBtn, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import UploadFile from "../../components/UploadFile";
import { useAddNewProductMutation } from "../../services/product_api";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useGetCategoryListQuery } from '../../services/category_api';

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

export default function AddProduct() {
    const [addNewProduct] = useAddNewProductMutation();
    const { data: details, error, isLoading } = useGetCategoryListQuery();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log("Submitted values:", values);
            await addNewProduct({ ...values }).unwrap();
            toast.success('Product added successfully');
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(err.data.msg || 'Failed to add product');
        }
    };

    return (
        <div className="add-product w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Add New Product</h6>
            <Formik
                initialValues={{
                    name: '',
                    category_id: '',
                    price: 0,
                    color: [{ name: '', qty: 1 }],
                    product_size: [],
                    description: '',
                    product_image_url: '' // Make sure this is included
                }}
                validationSchema={validationSchema}
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
                            {isLoading ? (
                                <p>Loading categories...</p>
                            ) : error ? (
                                <p className="text-danger">Error fetching categories</p>
                            ) : (
                                <Field as="select" name="category_id" className="form-control">
                                    <option value="">Select a category</option>
                                    {details.categories && details.categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                            )}
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

                        <UploadFile name="product_image_url" /> {/* Pass name prop */}
                        <ErrorMessage name="product_image_url" component="div" className="text-danger" />

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

                        <MDBBtn type="submit" block>Add Product</MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
