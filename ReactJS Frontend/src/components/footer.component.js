import React from "react";
import {Link} from "react-router-dom";

function FooterComponent() {
        return (
            <footer className="footer mt-auto py-3 bg-light" style={{ position: "fixed", bottom: 0, width: "100%" }}>
                <div className="container text-center">
                    <span className="text-muted">Выполнила команда </span>
                    <Link to={"/about"}>Crypto Boys</Link>
                    <span className="text-muted">.</span>
                </div>
            </footer>
        );
    }


export default FooterComponent;
