import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

export default function Register() {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <MDBCol size="12" md="8" lg="4">
                <h6 className='text-center mb-3'>Register</h6>
                <form>
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <MDBInput id='form3Example1' label='First name' size='sm' />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput id='form3Example2' label='Last name' size='sm' />
                        </MDBCol>
                    </MDBRow>
                    <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' size='sm' />
                    <MDBInput className='mb-4' type='number' id='form3Example3' label='Phone number' size='sm' />
                    <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' size='sm' />
                    <MDBInput className='mb-4' type='password' id='form3Example4' label='Confirm Password' size='sm' />



                    <MDBBtn type='submit' className='mb-4' block size='sm'>
                        Register
                    </MDBBtn>


                </form>
            </MDBCol>
        </div>
    );
}