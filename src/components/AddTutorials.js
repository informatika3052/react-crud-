import React, { useState } from "react";

import TutorialDataService from '../services/TutorialService'

const AddTutorial = () => {

    // Deklarasi variabel untuk pengisian input dari user
    const initialTutorialState = {
        id: null,
        name: "",
        username: "",
        published: true
    };
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);

    // fungsi untuk menerima inputan dari user
    const handleInputChange = event => {
        // destructuring object
        const { name, value } = event.target;

        // set isi dari inputan user 
        //  spread operator , 
        setTutorial({ ...tutorial, [name]: value });
    };

    // fungsi untuk menyimpan inputan user 
    const saveTutorial = () => {
        var data = {
            name: tutorial.name,
            username: tutorial.username
        };

        // memasukkan data ke server dan mengeset nya  di setTutorial
        TutorialDataService.create(data)
            .then(response => {
                console.log(response);
                setTutorial({
                    id: response.data.id,
                    name: response.data.name,
                    username: response.data.username,
                    published: response.data.published
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e.messsage);
            });
    };

    // fungsi untuk mengeset tanmpilan awal 
    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setSubmitted(false);
    };

    return (

        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
                    </button>
                </div>
            ) : (

                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Name</label>

                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={tutorial.name}
                                onChange={handleInputChange}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                required
                                value={tutorial.username}
                                onChange={handleInputChange}
                                name="username"
                            />
                        </div>

                        <button onClick={saveTutorial} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
        </div>
    );
};

export default AddTutorial;
