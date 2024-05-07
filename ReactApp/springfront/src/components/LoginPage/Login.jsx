import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loginError, setLoginError] = useState(''); // New state variable for login error
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable for login status

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
            axios.post('http://localhost:9000/api/v1/users', formValues)
                .then(response => {
                    if (response.data.status === 'success') {
                        console.log(response);
                        navigate('/itemList'); // Navigate to ItemList page
                        setIsLoggedIn(true); // Set login status to true
                    } else {
                        setLoginError('Invalid credentials'); // Set login error
                    }
                })
                .catch(error => {
                    console.log(error);
                    setLoginError('Invalid credentials'); // Set login error
                });
        }
    }, [formErrors, formValues, isSubmit, navigate]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
        return errors;
    };

    return (
        <>
            <div className="loginPageBgImg"></div>
            <div className="loginPageContainer">
                {isLoggedIn && <div className="ui message success">Logged in successfully</div>} {/* Display success message only when login is successful */}
                <form onSubmit={handleSubmit} className="ui form">
                    <h1>Login</h1>
                    <div className="ui divider"></div>
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
                    {loginError && <p>{loginError}</p>} {/* Display login error */}
                    <button className="ui button">Login</button>
                </form>
                <div className="loginPageText">
                    Create an account <span className="loginPageSpan">SignUp</span>
                </div>
            </div>{" "}
        </>
    );
}

export default Login;