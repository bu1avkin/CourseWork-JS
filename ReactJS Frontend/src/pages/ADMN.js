import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../styles/Home.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Cards.css";

export default function Wiki() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    const deleteRow = async (id) => {
        confirmAlert({
            title: "Подтвердите удаление",
            message: "Вы действительно хотите удалить эту публикацию?",
            buttons: [
                {
                    label: "Отмена",
                    onClick: () => {},
                },
                {
                    label: "Удалить",
                    onClick: () => {
                        axios.delete(`http://localhost:8080/wiki/delete/${id}`).then(() => {
                            loadRows();
                        });
                    },
                },
            ],
        });
    };

    useEffect(() => {
        loadRows();
    }, []);

    const loadRows = async () => {
        const result = await axios.get("http://localhost:8080/wiki");
        setRows(result.data);
    };

    const filteredRows = rows.filter(
        (row) =>
            row.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.maintext.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get("search");
        setSearchTerm(searchQuery || "");
    }, [location]);

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Слова</th>
                        <th scope="col">Определения</th>
                        <th scope="col">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRows.map((row, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{row.title}</td>
                            <td>{row.description}</td>
                            <td>
                                <div className="d-flex">
                                    <Link
                                        className="btn btn-primary"
                                        to={`/wiki/${row.id}`}
                                        style={{ marginRight: "10px" }}
                                    >
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                    <Link
                                        className="btn btn-outline-primary"
                                        to={`/wiki/update/${row.id}`}
                                        style={{ marginRight: "10px" }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteRow(row.id)}
                                        style={{ marginRight: "10px" }}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
