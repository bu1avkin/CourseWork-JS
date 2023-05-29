import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../styles/Cards.css";

export default function Cards() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    useEffect(() => {
        loadRows();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get("search");
        setSearchTerm(searchQuery || "");
    }, [location]);

    const loadRows = async () => {
        try {
            const response = await axios.get("http://localhost:8080/wiki");
            setRows(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const truncateDescription = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }
        return text.substring(0, limit) + "...";
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = rows.filter(
        (row) =>
            row.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="card-container">
                {filteredRows.length > 0 ? (
                    filteredRows.map((row, index) => (
                        <div className="card" key={index}>
                            <Link to={`/wiki/${row.id}`} className="card-link">
                                <h5>{row.title}</h5>
                                <p className="description">{truncateDescription(row.description, 80)}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="no-results">Нет результатов</p>
                )}
            </div>
            <br/>
            <br/>
        </div>
    );
}
