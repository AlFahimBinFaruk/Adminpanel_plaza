import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { useDeleteCategoryMutation, useGetCategoryListQuery } from "../../services/category_api";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function CategoryList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: details, error, isLoading } = useGetCategoryListQuery({ page: currentPage });

    const [deleteCategory] = useDeleteCategoryMutation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching user categories</div>;
    }

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id).unwrap();
            toast.success('Category deleted successfully');

        } catch (err) {
            toast.error(err.data?.msg || 'Failed to delete category');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="category-list">
            <Link to="/add-category">
                <MDBBtn className="ms-auto mb-5">Add New</MDBBtn>
            </Link>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        {/* <th scope='col'>Created at</th>
                        <th scope='col'>Updated at</th> */}
                        <th scope='col'>Actions</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {details.categories.length > 0 ? details.categories.map((data, index) => (
                        <tr key={index}>
                            <td>{data.name}</td>
                            {/* <td>2 june,2023</td>
                        <td>22 june,2023</td> */}
                            <td>
                                <Link to={`/update/category/${data._id}`}>
                                    <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                                </Link>
                                <MDBIcon far icon="trash-alt" role="button" color="danger" onClick={() => handleDelete(data._id)} />
                            </td>
                        </tr>
                    )) : <p>No data to show</p>}



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