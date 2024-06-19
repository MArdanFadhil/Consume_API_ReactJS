import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Category() {
    const [category, setCategory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCategory()
    }, []);

    function getCategory() {
        axios.get(`${import.meta.env.VITE_API_URL}/category/data`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setCategory(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status = 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        })
    }

    const headers = [
        "#",
        "Name",
        "Category",
    ]

    const endpointModal = {
        // "data_detail" : "http://localhost:8000/stuff/show/{id}",
        "delete" : "http://localhost:8000/category/delete/{id}",
        "update" : "http://localhost:8000/category/update/{id}",
        "store" : "http://localhost:8000/category/store",
    }
    
    const inputData = {
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ['Sayur', 'Buah', 'Benda']
        },
    }

    const buttons = [
        "create",
        "edit",
        "delete"
    ]

    const tdColumn = {
        "name" : null,
        "category" : null,
    }

    const columnIdentitasDelete = 'name';
    const title = 'Category';

    return (
        <Case>
            <Table headers={headers} data={category} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}