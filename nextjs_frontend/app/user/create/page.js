"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navBar";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function AddUser() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailFieldError, setEmailFieldError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError1, setPasswordError1] = useState(false);
    const [passwordError2, setPasswordError2] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);
        setLoading(true); // Start loading animation
        setEmailError(false);

        if(!formData.name && !formData.email && !formData.password && !formData.confirmPassword) {
          setError(false);
          setUsernameError(true);
          setEmailFieldError(true);
          setPasswordError1(true);
          setPasswordError2(true);
          setLoading(false);
          return;
        } else {
          setUsernameError(false);
          setEmailFieldError(false);
          setPasswordError1(false);
          setPasswordError2(false);
        }

        // Validate required fields
        if (!formData.name.trim()) {
          setError(false);
          setUsernameError(true);
          setLoading(false);
          return;
        }

        if (!formData.email.trim()) {
          setError(false);
          setEmailFieldError(true);
          setLoading(false);
          return;
        }

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError(false);
            setPasswordError1(true);
            setLoading(false); // Stop loading animation
            return;
        } else {
            setPasswordError1(false);
        }
        
        // Validate password length
        if (formData.password.length < 8 || formData.password.length > 16) {
            setError(false);
            setPasswordError2(true);
            setLoading(false); // Stop loading animation
            return;
        } else {
          setPasswordError2(false);
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/addnew`, formData);
            // console.log(response);
            setSuccess('Registration successful!');
            setTimeout(() => {
                window.location.href = ('/');
            }, 2000);
        } catch (err) {
            // console.log("Something went wrong!");

            // Check if the error response indicates that the email already exists
            if (err.response && err.response.data && err.response.data.message === "Email already exists") {
                setError(false);
                setEmailError(true);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
      <main>
        <section className="vh-100 bg-393E46">
          <div className="p-0 h-100">
            {/* Navbar */}
            <Navbar/>

            {/* Main Content */}
            <div className="container mt-4 w-60">
              <div className="bg-222831 p-5 shadow rounded">
                <div>
                  <h3 className="fw-semibold text-light">Add User</h3>
                </div>
                <div className="mt-3">
                    {error && (
                        <div className="alert alert-danger d-flex" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                        <div>{error}</div>
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                        <div>{success}</div>
                        </div>
                    )}
                </div>
                <hr className="mt-3 mb-3 text-secondary"></hr>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control bg-secondary text-light border-0"
                      id="name"
                      placeholder="Enter your name"
                      required
                      onChange={e => handleChange(e)}
                    />
                    {usernameError && <div className="text-danger mt-1">Name field is required.</div>}
                  </div>
    
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className={`form-control bg-secondary text-light border-0 ${emailError ? 'is-invalid' : ''}`}
                      id="email"
                      placeholder="Enter a valid email"
                      required
                      onChange={e => handleChange(e)}
                    />
                    {emailFieldError && <div className="text-danger mt-1">Email field is required.</div>}
                    {emailError && <div className="text-danger mt-1">This email is already registered.</div>}
                  </div>
    
                  <div className="mb-3">
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className={`form-control bg-secondary text-light border-0 ${passwordError2 ? 'is-invalid' : ''}`}
                            id="password"
                            placeholder="Enter password"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                              </svg>
                            )}
                        </button>
                    </div>
                    {passwordError2 && <div className="text-danger mt-1">Password must be between 8 and 16 characters.</div>}
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            className={`form-control bg-secondary text-light border-0 ${passwordError1 ? 'is-invalid' : ''}`}
                            id="confirmPassword"
                            placeholder="Re-enter password"
                            required
                            onChange={(e) => handleChange(e)}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                              </svg>
                            )}
                        </button>
                    </div>
                    {passwordError1 && <div className="text-danger mt-1">Password does not match.</div>}
                  </div>
    
                  <div className="mt-4 d-flex flex-wrap gap-2">
                      <Link
                          href="/"
                          className="btn btn-outline-secondary w-100 fs-6 d-flex align-items-center justify-content-center"
                      >
                          Cancel
                      </Link>
                      <button
                          type="submit"
                          className="w-100 fs-6 fw-normal btn btn-custom d-flex align-items-center justify-content-center"
                          onClick={e => handleSubmit(e)}
                          disabled={loading} // Disable button while loading
                      >
                          {loading ? (
                              <span>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              </span>
                          ) : (
                              'Submit'
                          )}
                      </button>
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