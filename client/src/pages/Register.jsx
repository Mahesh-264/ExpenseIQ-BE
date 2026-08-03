import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/auth/register", formData);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="glass-card" style={{ width: "450px" }}>

                <h2 className="text-center mb-4">
                    Register
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        onChange={handleChange}
                    />

                    <button className="btn btn-light w-100">
                        Register
                    </button>

                </form>

                <p className="mt-3 text-center">

                    Already have an account?

                    <Link
                        to="/"
                        className="ms-2 text-white"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;