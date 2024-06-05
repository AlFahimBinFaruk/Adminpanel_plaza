import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import SingleProductRow from '../components/SingleProductRow';

export default function ProductList() {
    return (
        <div className="product-list">
            <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Color</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <SingleProductRow />
                    <SingleProductRow />



                </MDBTableBody>
            </MDBTable>
        </div>
    );
}