import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/View.css";

export default function ViewRow() {
  const [row, setRow] = useState({
    title: "",
    description: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadRow();
  }, []);

  const loadRow = async () => {
    const result = await axios.get(`http://localhost:8080/wiki/${id}`);
    setRow(result.data);
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card wide-card">
              <div className="card-body">
                <h2 className="card-title">{row.title}</h2>
                <ul className="list-group">
                  {/*<li className="list-group-item">*/}
                  {/*  <b>ID:</b> {row.id}*/}
                  {/*</li>*/}
                  {/*<li className="list-group-item">*/}
                  {/*  <b>{row.title}</b>*/}
                  {/*</li>*/}
                  <li className="list-group-item">
                    {row.description}
                </li>
                </ul>
              </div>
                <Link className="btn btn-primary" to={"/"}>
                  Вернуться на главную
                </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
