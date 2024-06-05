import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBBtn,
} from 'mdb-react-ui-kit';

export default function Login() {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <MDBCol size="12" md="8" lg="4">
                <h6 className='text-center mb-3'>Login</h6>
                <form>

                    <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' size='sm' />
                    <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' size='sm' />



                    <MDBBtn type='submit' className='mb-4' block size='sm'>
                        Login
                    </MDBBtn>


                </form>
            </MDBCol>
        </div>
    );
}