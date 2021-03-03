import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialDataService from '../services/TutorialService'

// membuat fungsi untuk mengambil data  berdasarka data, menghapus data
const TutorialsList = () => {
    // useState untuk mengisi data yang akan dikirim 
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    // digunakan untuk merender data setiap kali halaman di load , model penggunaan mirip seperti componentdidmount
    useEffect(() => {
        retrieveTutorials();
    }, []);

    // menginisialisasi inputan dari user untuk dikirim ke fungsi findByTitle
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    // fungsi untuk mengambil semua data 
    const retrieveTutorials = () => {
        TutorialDataService.getAll()
            .then(response => {
                setTutorials(response.data);
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // fungsi untuk merefresh data setelah user berinteraksi
    const refreshList = () => {
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    // fungsi untuk menghapus data
    const removeAllTutorials = () => {
        TutorialDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };


    // fungsi untuk mencari data user menggunakan id dari user
    const findByTitle = () => {
        TutorialDataService.findByTitle(searchTitle)
            .then(response => {
                setTutorials(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input type="text"
                        className="form-control"
                        placeholder="Search by ID"
                        value={searchTitle}
                        onChange={onChangeSearchTitle} />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}>Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Tutorials List</h4>

                <ul className="list-group">
                    {tutorials &&
                        tutorials.map((tutorial, index) => (
                            <li
                                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => setActiveTutorial(tutorial, index)}
                                key={index}>
                                {tutorial.name}
                            </li>
                        ))}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTutorials}>Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Nama:</strong>
                            </label>{" "}
                            {currentTutorial.name}
                        </div>
                        <div>
                            <label>
                                <strong>Username:</strong>
                            </label>{" "}
                            {currentTutorial.username}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/tutorials/" + currentTutorial.id}
                            className="badge badge-warning">Edit
                        </Link>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default TutorialsList;
