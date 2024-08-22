import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import {
    MDBInput,
    MDBCol,
    MDBBtn,
} from 'mdb-react-ui-kit';
import { useLoginUserMutation } from '../services/user_api';

// Define validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values, { resetForm }) => {

        try {
            const { email, password } = values;
            const res = await loginUser({ email, password }).unwrap(); // Use unwrap for better error handling


            localStorage.setItem("token", res.token);


            toast.success("Login successful");
            resetForm();
            window.location.assign("/");

        } catch (err) {
            console.error(err);
            toast.error(err.data.msg || "An error occurred");
        }
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <MDBCol size="12" md="8" lg="4">
                <h6 className='text-center mb-3'>Login</h6>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <div className="mb-4">
                                <Field
                                    name="email"
                                    as={MDBInput}
                                    type="email"
                                    id="form3Example3"
                                    label="Email address"
                                    size="sm"
                                    className="form-control"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="mb-4">
                                <Field
                                    name="password"
                                    as={MDBInput}
                                    type="password"
                                    id="form3Example4"
                                    label="Password"
                                    size="sm"
                                    className="form-control"
                                />
                                <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                            </div>
                            <MDBBtn type="submit" className="mb-4" block size="sm">
                                Login
                            </MDBBtn>
                        </Form>
                    )}
                </Formik>
            </MDBCol>
        </div>
    );
};

export default Login;
