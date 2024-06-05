import { MDBBtn, MDBInput, MDBTextArea, MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function ManageUser() {
    return (
        <div className="manage-user w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Manage User</h6>
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
                <div className="mb-3">
                    <p className="mb-0 small">Select Role</p>
                    <select name="role" id="role" form="roleform" className="form-control form-sm select-input placeholder-active active">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' size='sm' />
                <MDBInput className='mb-4' type='password' id='form3Example4' label='Confirm Password' size='sm' />



                <MDBBtn type='submit' className='mb-4' block size='sm'>
                    Add user
                </MDBBtn>


            </form>
        </div>
    )
}