import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <h1>BOTAPP</h1>
                <ul className="nav-links">
                    {isAuthenticated && (
                        <>
                            <li>
                                <NavLink to="/commands" className={location.pathname === '/commands' ? 'active' : ''}>
                                    Commands
                                </NavLink>
                            </li>
                            <li>
                                <a onClick={handleLogout} className="nav-btn" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                                    Logout
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};
