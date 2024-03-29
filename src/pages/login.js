import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navigation from '../components/Navbar';
import { useUser } from '../hooks/useUser'
import { Toaster } from 'sonner';
import { toast } from 'sonner';



    const Login = () => {

        const navigate = useNavigate();
        const { loginUser } = useUser(); // Assuming your useUser hook has a function loginUser

        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

        const [errorMessage] = useState('');

        const handleInputChange = (e) => {
            const { id, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
          
            // Add validation if email and password are not empty
            if (!formData.email || !formData.password) {
              toast.error('Email and password are required.');
              return;
            }
        
            try {
                // Call the loginUser function from useUser hook
                const user = await loginUser(formData);
        
                // If login is successful, you can redirect to the dashboard or do other actions
                if (user) {
                    
                    localStorage.setItem('userEmail', formData.email);
                    navigate('/dashboard'); // Redirect to the dashboard
                    toast.success('Login successful!');
                } else {
                    // If login is not successful, display an error message
                    toast.error('Invalid email or password. Please try again.');
                }
            } catch (error) {
                console.error('Login failed', error);
                toast.error('An error occurred during login. Please try again.');
            }
        };
       
        return (
            <main>
                <Navigation />
                <Toaster richColors className='div-container-position' />
                <div className="div-container1" style={{ minHeight: "83.8vh" }}>
                    {errorMessage && (
                        <div className="text-red-500 mb-4 border-2 border-red-300 p-4 bg-red-200 rounded-md">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}
                    style={{ height: "44vh", marginTop: "-10vh" }}>
                        <h2 
                        style={{
                          textAlign: "center",
                          marginLeft: "-15vh",
                          marginTop: "0.5vh",
                          marginBottom: "1vh",
                        }}
                        className="head-title">Login</h2>
                        <div className="outerBox">
                            <label htmlFor="email" className="labelBox">
                                Email:
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="inputBox"
                            />
                        </div>

                        <div className="outerBox">
                            <label htmlFor="password" className="labelBox">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="inputBox"
                            />
                        </div>
                        <button type="submit" className="signup_button">
                            Sign In
                        </button>
                    </form>
                </div>
            </main>
        );
    };

    export default Login;