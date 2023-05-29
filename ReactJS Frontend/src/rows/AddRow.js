import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddRow() {
  let navigate = useNavigate();

  const [row, setRow] = useState({
    title: "",
    description: "",
  });

  const { title, description } = row;

  const onInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/wiki/new", row);
    navigate("/");
  };

  return (
    <div className="container" style={{textAlign: "left"}}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Добавить публикацию</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Слово
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Напишите слово"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Определение
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Напишите определение"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Добавить
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Отмена
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
