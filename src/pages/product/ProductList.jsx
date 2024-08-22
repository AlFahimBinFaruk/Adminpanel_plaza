import React, { useState } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import SingleProductRow from '../../components/SingleProductRow';
import { useGetProductListQuery } from "../../services/product_api";
import { Link } from 'react-router-dom';


export default function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: details, isLoading, error } = useGetProductListQuery({ page: currentPage });
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
            <Link to="/add-product">
                <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
            </Link>
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

                    {details.products.length > 0 ? details.products.map((data, index) => (
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src={data.product_image_url}
                                        alt=''
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1 product-name'>{data.name}</p>
                                        {/* <p className='text-muted mb-0 product-category'>
                                            {data.product}
                                        </p> */}
                                    </div>
                                </div>
                            </td>
                            <td>
                                {data.color.map((color, ind) => (
                                    <p className='fw-normal mb-1 small'>{color.name}: {color.qty}</p>
                                ))}



                            </td>
                            <td>
                                <p className='fw-bold mb-1 product-name'>{data.price} tk</p>
                            </td>

                            <td>
                                <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                                <MDBIcon far icon="trash-alt" role="button" color="danger" />
                            </td>
                        </tr>
                    )) : <p>No product to show</p>}
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