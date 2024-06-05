import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

export default function UserList() {
    return (
        <div className="userlist-list">
            <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>First name</th>
                        <th scope='col'>Last name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Phone</th>


                        <th scope='col'>Role</th>
                        <th scope='col'>Actions</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>John</td>
                        <td>Smilga</td>
                        <td>j@gmail.com</td>
                        <td>01258974568</td>
                        <td>Customer</td>
                        <td>
                            <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                            <MDBIcon far icon="trash-alt" role="button" color="danger" />
                        </td>
                    </tr>



                </MDBTableBody>
            </MDBTable>
        </div>
    );
}