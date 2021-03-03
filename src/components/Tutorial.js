import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";

const Tutorial = props => {
    // Deklarasi variabel untuk pengisian input dari user
    const initialTutorialState = {
        id: null,
        name: "",
        username: "",
        published: false
    };
    // set data dengan menggunakan metode react hooks
    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState("");

    // mengambil data berdsarkan id user
    const getTutorial = id => {
        TutorialDataService.get(id)
            .then(response => {
                setCurrentTutorial(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // merender data dari fungsi getTutorial
    useEffect(() => {
        console.log(props.match.params.id);
        getTutorial(props.match.params.id);
    }, [props.match.params.id]);

    // function untuk menghandle input dari user
    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTutorial({ ...currentTutorial, [name]: value });
    };

    // ini saya masih belum cara penggunaan nya , wkwkwkwkwk
    // sepertinya untuk mengetahui data sudah di publish atau belum
    const updatePublished = status => {
        var data = {
            id: currentTutorial.data.id,
            name: currentTutorial.data.name,
            username: currentTutorial.data.username,
            published: status
        };

        TutorialDataService.update(currentTutorial.id, data)
            .then(response => {
                setCurrentTutorial({ ...currentTutorial, published: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // fungsi untuk mengupdate dan langsung refresh ke halaman tutorials
    // dengan menggunakan metod props.history.push
    const updateTutorial = () => {
        TutorialDataService.update(currentTutorial.id, currentTutorial)
            .then(response => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully!");
                props.history.push("/tutorials");
            })
            .catch(e => {
                console.log(e);
            });
    };

    // fungsi untuk menghapus data berdasarkan id
    const deleteTutorial = () => {
        TutorialDataService.remove(currentTutorial.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/tutorials");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        // mengunakan pengecekan dengan metode ternary operator
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tinametle"
                                name="name"
                                value={currentTutorial.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={currentTutorial.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentTutorial.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}>UnPublish
                        </button>
                    ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => updatePublished(true)}>
                                Publish
                            </button>
                        )}

                    <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateTutorial}>Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
        </div>
    );
};

export default Tutorial;
