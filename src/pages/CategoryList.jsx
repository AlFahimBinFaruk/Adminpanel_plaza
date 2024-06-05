import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

export default function CategoryList() {
    return (
        <div className="category-list">
            <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Created at</th>
                        <th scope='col'>Updated at</th>
                        <th scope='col'>Actions</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>Shirt</td>
                        <td>2 june,2023</td>
                        <td>22 june,2023</td>
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