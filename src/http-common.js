// import axios dengan npm install axios

import axios from "axios";


// membuat wadah untuk nanti dpanggil di file TutorialService.js
export default axios.create({
    baseURL: "http://localhost:3004/tutorials",
    headers: {
        "Content-type": "application/json"
    }
});
