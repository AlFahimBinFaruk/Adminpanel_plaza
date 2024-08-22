import React, { useState } from 'react';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useAddNewCategoryMutation } from "../../services/category_api";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Define validation schema using Yup
const validationSchema = Yup.object({
    categoryName: Yup.string()
        .required('Category name is required')
        .min(3, 'Category name must be at least 3 characters'),
});

export default function AddCategory() {
    const [addNewCategory] = useAddNewCategoryMutation();

    // Initial values for the form
    const initialValues = {
        categoryName: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await addNewCategory({ name: values.categoryName }).unwrap();
            toast.success('Category added successfully');
            resetForm();
        } catch (err) {
            toast.error(err.data.msg || 'An error occurred');
        }
    };

    return (
        <div className="add-category w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Add New Category</h6>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                            Add
                        </MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
