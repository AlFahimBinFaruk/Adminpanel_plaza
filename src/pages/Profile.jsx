import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function Profile() {
    return (
        <div className="form-container">
            <h6 className='text-center mb-3'>Manage Profile</h6>
            <form>
                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput id='form3Example1' label='First name' value={"test"} />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput id='form3Example2' label='Last name' value={"test"} />
                    </MDBCol>
                </MDBRow>
                <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' value={"test@gmail.com"} />
                <MDBInput className='mb-4' type='number' id='form3Example3' label='Phone Number' value={"0125365898"} />
                <MDBInput className='mb-4' label="Admin" id="formControlDisabled" type="text" disabled />
                <MDBInput className='mb-4' type='password' id='form3Example4' label='New password' />
                <MDBInput className='mb-4' type='password' id='form3Example4' label='Enter old password to update' />



                <MDBBtn type='submit' className='mb-4' block color='warning'>
                    Update
                </MDBBtn>


            </form>
        </div>
    );
}