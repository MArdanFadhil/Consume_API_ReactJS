import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Product() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getProducts()
    }, []);

    function getProducts() {
        axios.get(`${import.meta.env.VITE_API_URL}/product/data`, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setProducts(res.data.data);
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
        "Category_id",
        "User_id",
        "Name",
        "Total",
        "Harga",
    ]

    const endpointModal = {
        // "data_detail" : "http://localhost:8000/stuff/show/{id}",
        "delete" : "http://localhost:8000/category/delete/{id}",
        "update" : "http://localhost:8000/category/update/{id}",
        "store" : "http://localhost:8000/category/store",
    }
    
    const inputData = {
        "category_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "user_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "total" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "harga" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
    }

    const buttons = [
        "create",
        "edit",
        "delete"
    ]

    const tdColumn = {
        "category_id" : null,
        "user_id" : null,
        "name" : null,
        "total" : null,
        "harga" : null,
    }

    const columnIdentitasDelete = 'name';
    const title = 'Product';

    return (
        <Case>
            <Table headers={headers} data={products} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}