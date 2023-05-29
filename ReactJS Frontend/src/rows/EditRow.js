import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function EditRow() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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


  const { title, description} = row;

  const onInputChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/wiki/update/${id}`, row);
    navigate("/admin");
  };

  const loadRows = async () => {
    const result = await axios.get(`http://localhost:8080/wiki/update/${id}`);
    const { title, description } = result.data;
    setRow({ title, description });
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Update Public</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3" style={{textAlign: "left"}}>
              <label htmlFor="Title" className="form-label">
                Слово
              </label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Напишите слово"
                  name="title"
                  value={row.title || ""}
                  onChange={(e) => onInputChange(e)}
                  style={{ wordWrap: "break-word" }}
              />
            </div>
            <div className="mb-3" style={{textAlign: "left"}}>
              <label htmlFor="Description" className="form-label">
                Определение
              </label>
              <textarea
                  className="form-control"
                  placeholder="Напишите определение"
                  name="description"
                  value={row.description || ""}
                  onChange={(e) => onInputChange(e)}
                  style={{ resize: "vertical", minHeight: "200px" }}
              />

            </div>
            {/*<button type="submit" className="btn btn-outline-primary">*/}
            {/*  Submit*/}
            {/*</button>*/}
            <Button variant="primary" onClick={handleShow}>
              Сохранить
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Сохранить изменения?</Modal.Title>
              </Modal.Header>
              <Modal.Body>Отменить изменения будет невозможно.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Закрыть
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                  Подтвердить
                </Button>
              </Modal.Footer>
            </Modal>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Отменить
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
