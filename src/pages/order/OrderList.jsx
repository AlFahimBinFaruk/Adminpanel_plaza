import React, { useState } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetOrderListQuery } from '../../services/order_api';


export default function OrderList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: details, isLoading, error } = useGetOrderListQuery({ page: currentPage });

    if (isLoading) {
        return <div>Loading...</div>;
    }



    if (error) {
        return <div>Error fetching user products</div>;
    }



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // console.log("data is ", details);
    return (
        <div className="product-list">
           
            <MDBTable align='middle'>
                <MDBTableHead>

                    <tr>
                        <th scope='col'>Order Id</th>
                        <th scope='col'>Order Status</th>

                        <th scope='col'>Actions</th>
                    </tr>


                </MDBTableHead>
                <MDBTableBody>

                    {details.orders.length > 0 ? details.orders.map((data, index) => (
                        <tr>
                            <td>
                                <Link to={`/manage-order/${data._id}`}>
                                    <p className='fw-bold mb-1 product-name'>{data._id}</p>
                                </Link>
                            </td>
                            <td>
                                <p className='fw-bold mb-1 product-name'>{data.order_status}</p>
                            </td>

                            <td>
                                <Link to={`/update-product/${data._id}`}>
                                    <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                                </Link>

                            </td>
                        </tr>
                    )) : <p>No orders to show</p>}
                </MDBTableBody>
            </MDBTable>


            <div className="pagination-controls mt-5 mx-auto">
                <MDBBtn
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    size="sm"
                >
                    Previous
                </MDBBtn>
                <span className="mx-3">Page {currentPage}</span>
                <MDBBtn
                    disabled={details.totalPages <= currentPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    size="sm"
                >
                    Next
                </MDBBtn>
            </div>
        </div>
    );
}