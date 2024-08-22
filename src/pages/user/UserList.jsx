import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { useGetUserListQuery } from '../../services/user_api';
import { Link } from 'react-router-dom';

export default function UserList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: details, error, isLoading } = useGetUserListQuery({ page: currentPage });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching user profile</div>;
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="userlist-list">
            {/* <MDBBtn className="ms-auto mb-5">Add New</MDBBtn> */}
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
                    {details.users && details.users.map((user) => (
                        <tr key={user._id}>
                            <td>{user?.first_name || "None"}</td>
                            <td>{user?.last_name || "None"}</td>
                            <td>{user.email}</td>
                            <td>{user?.phone || "None"}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/manage-user/${user._id}`}>
                                    <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                                </Link>
                                <MDBIcon far icon="trash-alt" role="button" color="danger" />
                            </td>
                        </tr>
                    ))}
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
