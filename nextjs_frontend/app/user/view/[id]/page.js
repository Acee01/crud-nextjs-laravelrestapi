"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navBar";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function viewUser() {
    const {id} = useParams();

    // console.log(id);
    const[user, setUser] = useState([]);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser=async()=>{
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/users/"+id);
            console.log(result.data.users);
            setUser(result.data.users);
        } catch(err) {
            console.log('Something went wrong!');
        }
    }

    return(
        <main>
            <section className="vh-100 bg-393E46">
                <div className="p-0 h-100">
                    {/* Navbar */}
                    <Navbar/>
                    
                    {/* Main Content */}
                    <div className="container mt-4 w-60">
                        <div className="bg-222831 p-5 shadow rounded">
                        <div>
                            <h2 className="fs-3 fw-semibold text-light">View User</h2>
                        </div>
                        <hr className="mt-3 mb-3 text-secondary"></hr>
                        <form>
                            <div className="mb-3">
                            <input
                                type="text"
                                name="name"
                                className="form-control bg-secondary text-light border-0"
                                id="name"
                                disabled
                                value= {user.name || ''}
                            />
                            </div>

                            <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control bg-secondary text-light border-0"
                                id="email"
                                disabled
                                value= {user.email || ''}
                            />
                            </div>

                            <div className="mb-3">
                            <input
                                type="text"
                                name="created_at"
                                className="form-control bg-secondary text-light border-0"
                                id="created_at"
                                disabled
                                value= {user.created_at || ''}
                            />
                            </div>

                            <div className="d-flex flex-wrap mt-4 gap-2">
                                <Link
                                    href="/"
                                    className="btn btn-outline-secondary w-100 fs-6 d-flex align-items-center justify-content-center"
                                >
                                    Cancel
                                </Link>
                                <Link
                                    href={"/user/edit/"+user.id}
                                    className="w-100 fs-6 fw-normal btn btn-custom d-flex align-items-center justify-content-center"
                                >
                                    Edit
                                </Link>
                            </div>
                        </form>
                        </div>
                    </div>

                    {/* Footer */}
                    <Footer/>
                </div>
            </section>
        </main>


    );
}