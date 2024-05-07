import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

function SignUp() {
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // Assuming you have an API endpoint at /api/signup that accepts POST requests
            axios.post('http://localhost:9000/api/v1/users', formValues)
                .then(response => {
                    console.log(response);
                    navigate('/login'); // Navigate to login page
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [formErrors, formValues, isSubmit, navigate]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Those passwords didn’t match. Try again.";
        }
        return errors;
    };

    return (
        <>
            <div className="loginPageBgImg"></div>
            <div className="loginPageContainer">
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="ui message success">
                        Signed in successfully
                    </div>
                ) : (
                    console.log("Entered Details", formValues)
                )}

                <form onSubmit={handleSubmit} className="ui form">
                    <h1>Sign Up</h1>
                    <div className="ui divider"></div>
                    <div className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                        <p>{formErrors.username}</p>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        <p>{formErrors.email}</p>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        <p>{formErrors.password}</p>
                    </div>
                    <div className="field">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                        />
                        <p>{formErrors.confirmPassword}</p>
                    </div>
                    <button className="ui button">Submit</button>
                </form>
                <div className="loginPageText">
                    Already have an account? <span className="loginPageSpan">Login</span>
                </div>
            </div>{" "}
        </>
    );
}

export default SignUp;