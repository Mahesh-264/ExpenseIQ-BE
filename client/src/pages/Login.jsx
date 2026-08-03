import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

            const res = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="glass-card" style={{ width: "450px" }}>

                <h2 className="text-center mb-4">
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

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
                        Login
                    </button>

                </form>

                <p className="mt-3 text-center">

                    New User?

                    <Link
                        to="/register"
                        className="ms-2 text-white"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;