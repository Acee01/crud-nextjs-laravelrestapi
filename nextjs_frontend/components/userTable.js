"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./footer";

export default function Users() {
    const [userData, setUserData] = useState([]);

    // Search
    const [filters, setFilters] = useState({
        user: '',
        sort: '',
        order: '',
        page: 1
    });

    const [lastPage, setLastPage] = useState(0);

    const [totalUsers, setTotalUsers] = useState(0);

    const [selectedValue, setSelectedValue] = useState('5');

    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        
        fetchData();

    }, [filters]);

    const fetchData = async () => {
        try {
            const arr = [];

            if(filters.user === '' || filters.user) {
                arr.push(`user=${filters.user}`);
                // console.log(`user=${filters.user}`);
            }

            if(filters.field === '' || filters.field) {
                arr.push(`sort=${filters.field}`);
                // console.log(`sort=${filters.field}`);
            }

            if(filters.direction === '' || filters.direction) {
                arr.push(`order=${filters.direction}`);
            }

            if(filters.rowsPerPage === '' || filters.rowsPerPage) {
                arr.push(`rowsPerPage=${filters.rowsPerPage}`);
            }

            if(filters.page === '' || filters.page) {
                arr.push(`page=${filters.page}`);
            }

            const result = await axios(`http://127.0.0.1:8000/api/users?${arr.join('&')}`);
            // console.log(result.data.results);
            setUserData(result.data.user);
            setLastPage(result.data.last_page);
            setTotalUsers(result.data.total);
        } catch (err) {
            console.log("Something went wrong");
        }
    }

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId);
        setShowModal(true);
    };
    
    const confirmDelete = () => {
        if (userToDelete !== null) {
            handleDelete(userToDelete);
            setShowModal(false);
        }
    };

    const handleDelete = async(id) => {
        // console.log(id);
        await axios.delete("http://127.0.0.1:8000/api/usersdelete/"+id);
        const newUserData = userData.filter((item) => {
            return (
                item.id !== id
            )
        })
        setUserData(newUserData);
    }

    // Searching function
    const search = (user) => {
        setFilters({
            ...filters,
            user
        });
    };

    // Sort function
    const handleSortFieldChange = (field) => {
        setFilters({
            ...filters,
            field
        });
    };

    const handleSortDirectionChange = (direction) => {
        setFilters({
            ...filters,
            direction
        });
        // console.log(direction);
    };

    // Pagination
    const handleNextPage = () => {
        setFilters({
            ...filters,
            page: filters.page + 1
        });
    }

    const handlePreviousPage = () => {
        setFilters({
            ...filters,
            page: filters.page - 1
        });
    }

    // Custom rows
    const handleRowChange = (rowsPerPage) => {
        setFilters({
            ...filters,
            rowsPerPage
        });
        setSelectedValue(rowsPerPage);
      };

    return (
        <>
            {/* CRUD Table */}
            <div className="mt-4 p-4 bg-222831 container rounded shadow">
                <div className="">
                    <div>
                        <h3 className="fw-semibold text-light">Manage User</h3>
                    </div>
                    <hr className="mt-3 mb-3 text-light"></hr>
                    <div className=" text-light rounded">
                        {/* Row: Search, Sort, and Add User */}
                        <div className="row align-items-center">
                            {/* Search and Sort Section */}
                            <div className="col-md-15 d-flex flex-wrap align-items-center justify-content-center gap-3">
                                {/* Search Box */}
                                <div className="input-group w-auto flex-grow-1">
                                    <span className="input-group-text bg-secondary border-0 text-light">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                        </svg>
                                    </span>
                                    <input
                                        className="form-control bg-secondary text-light border-0"
                                        id="search-box"
                                        type="text"
                                        name="search"
                                        placeholder="Search by name."
                                        required="required"
                                        onKeyUp={(e) => search(e.target.value)}
                                    />
                                </div>
                                
                                {/* Filter */}
                                <select
                                    className="form-select bg-secondary text-light border-0 w-auto"
                                    onChange={(e) => handleSortFieldChange(e.target.value)}
                                >
                                    <option className="option-light">-Order By Column-</option>
                                    <option value="name" className="option-light">Sort by Name</option>
                                    <option value="email" className="option-light">Sort by Email</option>
                                    <option value="created_at" className="option-light">Sort by Date Created</option>
                                </select>
                                <select
                                    className="form-select bg-secondary text-light border-0 w-auto"
                                    onChange={(e) => handleSortDirectionChange(e.target.value)}
                                >
                                    <option className="option-light">-Order Direction-</option>
                                    <option value="asc" className="option-light">Ascending</option>
                                    <option value="desc" className="option-light">Descending</option>
                                </select>

                                {/* Add User Button */}
                                <Link
                                    href="/user/create"
                                    className="w-auto btn btn-custom d-flex align-items-center justify-content-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                    Add new user
                                </Link>
                            </div>

                        </div>
                    </div>
                    {/* Table */}
                    <div className="container mt-3 border border-secondary shadow rounded overflow-auto">
                        <table className="">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData?.length > 0 ? (
                                    userData.map((users) => (
                                        <tr key={users.id}>
                                            <td>{users.id}</td>
                                            <td>{users.name}</td>
                                            <td>{users.email}</td>
                                            <td>{users.created_at}</td>
                                            <td className="d-flex justify-content-center gap-2">
                                                <Link href={`/user/view/${users.id}`} className="btn btn-secondary text-white d-flex align-items-center justify-content-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                    </svg>
                                                </Link>
                                                <Link href={`/user/edit/${users.id}`} className="btn btn-primary d-flex align-items-center justify-content-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                    </svg>
                                                </Link>
                                                <button className="btn btn-danger d-flex align-items-center justify-content-center" onClick={() => handleDeleteClick(users.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-3 h-100 d-flex align-items-center justify-content-between">
                    <div className="text-light badge d-flex align-items-center">
                        <div>Total Users:</div>
                        <div className="mx-1 fw-semibold">
                            {totalUsers}
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end w-100">
                        {/* Rows per page */}
                        <div className="w-100 badge gap-2 d-flex align-items-center justify-content-end">
                            <div className="gap-3 w-100 d-flex align-items-center justify-content-end">
                                <div className="text-light fw-semibold">
                                    Rows per page
                                </div>
                                <div className="w-8">
                                    <select
                                        className="form-select bg-light badge text-black text-start"
                                        value={selectedValue}
                                        onChange={(e) => handleRowChange(e.target.value)}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            {/* Pagination */}
                            <div className="badge d-flex justify-content-end align-items-center gap-3">
                                <button
                                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                                    disabled={filters.page <= 1}
                                    onClick={handlePreviousPage}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#EEE" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                </button>
                                <span className="text-light fw-bold">
                                    Page {userData?.length === 0 ? filters.page - 1 : filters.page} of {lastPage}
                                </span>
                                <button
                                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                                    disabled={filters.page >= lastPage}
                                    onClick={handleNextPage}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#EEE" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="w-100 h-100 modal bg-light bg-opacity-25 show d-flex align-items-center" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog w-50">
                        <div className="modal-content bg-dark text-light">
                            <div className="modal-header border-0">
                                <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                                <button type="button" className="btn btn-outline-secondary btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this user?
                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Footer */}
            <Footer/>
        </>
    );
}