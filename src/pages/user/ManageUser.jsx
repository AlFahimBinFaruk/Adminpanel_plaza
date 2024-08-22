import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../services/user_api';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string(),
    role: Yup.string().required('Role is required')
    
});

export default function ManageUser() {
    const params = useParams();
    const user_id = params.user_id;
    const { data: details, error, isLoading } = useGetUserDetailsQuery(user_id);
    const [updateUser] = useUpdateUserMutation();
    // console.log("detaisl ",details);
    // Set initial values from the API data
    const initialValues = {
        firstName: details?.first_name || '',
        lastName: details?.last_name || '',
        email: details?.email || '',
        phone: details?.phone || '',
        role: details?.role || ''
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await updateUser({ id: user_id, ...values }).unwrap();
            toast.success('User updated successfully');
            resetForm();
        } catch (err) {
            toast.error(err.data.msg || 'An error occurred');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching user details</div>;
    }

    return (
        <div className="manage-user w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Manage User</h6>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <MDBRow className='mb-4'>
                            <MDBCol>
                                <label htmlFor='firstName'>First Name</label>
                                <Field
                                    as={MDBInput}
                                    id='firstName'
                                    name='firstName'
                                    label='First Name'
                                    size='sm'
                                />
                                <ErrorMessage name='firstName' component='div' className='text-danger' />
                            </MDBCol>
                            <MDBCol>
                                <label htmlFor='lastName'>Last Name</label>
                                <Field
                                    as={MDBInput}
                                    id='lastName'
                                    name='lastName'
                                    label='Last Name'
                                    size='sm'
                                />
                                <ErrorMessage name='lastName' component='div' className='text-danger' />
                            </MDBCol>
                        </MDBRow>
                        <Field
                            as={MDBInput}
                            className='mb-4'
                            type='email'
                            id='email'
                            name='email'
                            label='Email address'
                            size='sm'
                        />
                        <ErrorMessage name='email' component='div' className='text-danger' />
                        <Field
                            as={MDBInput}
                            className='mb-4'
                            type='text'
                            id='phone'
                            name='phone'
                            label='Phone number'
                            size='sm'
                        />
                        <ErrorMessage name='phone' component='div' className='text-danger' />
                        <div className="mb-3">
                            <p className="mb-0 small">Select Role</p>
                            <Field
                                as="select"
                                name="role"
                                id="role"
                                className="form-control form-sm select-input placeholder-active active"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </Field>
                            <ErrorMessage name='role' component='div' className='text-danger' />
                        </div>
                        
                        
                        <MDBBtn type='submit' className='mb-4' block size='sm'>
                            Update User
                        </MDBBtn>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
