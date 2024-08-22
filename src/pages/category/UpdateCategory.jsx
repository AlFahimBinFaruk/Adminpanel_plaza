import React from 'react';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useAddNewCategoryMutation, useGetCategoryDetailsQuery, useUpdateCategoryMutation } from "../../services/category_api";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

// Define validation schema using Yup
const validationSchema = Yup.object({
    categoryName: Yup.string()
        .required('Category name is required')
        .min(3, 'Category name must be at least 3 characters'),
});

export default function UpdateCategory() {
    const params = useParams();
    const category_id = params.category_id;

    const { data: details, isLoading, error } = useGetCategoryDetailsQuery(category_id);
    const [updateCategory] = useUpdateCategoryMutation();

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error fetching category details</div>;
    }

    // Initial values for the form
    const initialValues = {
        categoryName: details?.name || '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await updateCategory({ id: category_id, name:values.categoryName }).unwrap();
            toast.success('Category updated successfully');
            resetForm();
        } catch (err) {
            toast.error(err.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className="add-category w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Update Category</h6>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}  // Ensure form is reinitialized when `initialValues` change
            >
                {() => (
                    <Form>
                        <Field
                            as={MDBInput}
                            type="text"
                            label="Enter category"
                            name="categoryName"
                            className="mb-3"
                        />
                        <ErrorMessage name="categoryName" component="div" className="text-danger" />
                        <MDBBtn type="submit" block size="sm">
                            Update
                        </MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
