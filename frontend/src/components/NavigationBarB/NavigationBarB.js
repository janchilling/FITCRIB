import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBarB.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserContext from "../ContextComponent/ContextComponent";

export default function NavigationBarB(props) {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();
    const id = props.id

    const { user } = useContext(UserContext);
 

    //   const MyWorkouts = () => {
    //     let path = `/MyWorkouts`;
    //     navigate(path);
    //   };

    //   const Home = () => {
    //     let path = `/`;
    //     navigate(path);
    //   }

    const hideHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/add' || location.pathname === '/addpayment';

    if (hideHeader) {
        return null; // Render nothing if header should be hidden
    }

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    //Home pages Control
    const HomepagesHandle = async () => {
        if (user.Fullname) {
            if (user.UserType === "Seller") {
                // history(`/seller_home/${user._id}`, { state: { id:user.Fullname } })
                window.location.href = `/SellerHome/${user._id}`;
            }
            else if (user.UserType === "Registered User") {
                // history(`/home/${user._id}`, { state: { id: user.Fullname } })
                window.location.href = `/home/${user._id}`;
            }
            else if (user.UserType === "Trainer") {
                // history(`/trainer_home/${user._id}`, { state: { id:user.Fullname } })
                window.location.href = `/trainer_home/${user._id}`;
            }
        }

    }

    return (
        <>
            <div className='NavigationBarB'>
                <nav className="NavigationBarB navbar navbar-expand-lg bg-body-tertiary">
                    <div className="NavigationBarB container-fluid">
                        <a className="NavigationBarB navbar-brand" onClick={HomepagesHandle}>FitCrib</a>
                        <button className="NavigationBarB navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="NavigationBarB navbar-toggler-icon"></span>
                        </button>
                        <div className="NavigationBarB collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="NavigationBarB navbar-nav">
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/MyWorkouts`
                                    }}>MY WORKOUTS</a>
                                </li>
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/userDashboard`
                                    }}>EXERCISES</a>
                                </li>
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" href="/buyer">MARKETPLACE</a>
                                </li>
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/Bview`
                                    }}>EDUCATIONAL CONTENT</a>
                                </li>
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/mainNT`
                                    }}>NUTRITION PLANS</a>
                                </li>
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/RUVA`
                                    }}>RECIPES</a>
                                </li>

                                <li>
                                    <div className="NavigationBarBarDropdown dropdown">
                                        <button className="NavigationBarB btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            {user.Username}
                                        </button>

                                        <ul className="NavigationBarB dropdown-menu dropdown-menu-dark">
                                            <li><a className="NavigationBarB dropdown-item" onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/profile/${user._id}`
                                            }}>My Profile</a></li>
                                            <li><a className="NavigationBarB dropdown-item" href="/login">Log out</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}

