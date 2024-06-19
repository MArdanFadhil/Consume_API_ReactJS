import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
    const [profile, setProfile] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => {
                setProfile(res.data.data);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
    }, []);
    return console.log(profile)

    const handleLogout = (event) => {
        event.preventDefault();
        axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            localStorage.removeItem('token');
            navigate('/login');
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <Case>
            <div className="block m-auto mt-10 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10 pt-10">
                    <FontAwesomeIcon icon="fa-solid fa-user" className="w-20 h-20 mb-3 text-gray-500" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{profile.username}</h5>
                    <span className="text-sm text-gray-500 dark:text-white">{profile.email}</span>
                    <div className="flex mt-4 md:mt-6">
                        <a href="#" onClick={handleLogout} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</a>
                    </div>
                </div>
            </div>
        </Case>
    )
}