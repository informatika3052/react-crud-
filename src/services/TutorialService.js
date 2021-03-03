// import isi dari file TutorialService.js dan di inisialisasi menjadi http

import http from "../http-common";

// Mengambil semua data dari file json
const getAll = async () => {
    return await http.get("");
};


// Mengambil satu data berdasarkan 'id'  dari file json
const get = async id => {
    return await http.get(`${id}`);
};

// membuat data untuk dikirm ke server
const create = async data => {
    return await http.post(`/`, data);
};

// mngembil data dari server berdasarkan id untuk nanti di edit
const update = async (id, data) => {
    return await http.put(`/${id}`, data);
};

// menghapus data berdasarkan id
const remove = async id => {
    return await http.delete(`${id}`);
};


// menghapus seluruh data di server
const removeAll = async () => {
    return await http.delete(``);
};

// mengambil data berdasarkan id
const findByTitle = async id => {
    return await http.get(`/?id=${id}`);
};

const TutorialDataService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle

}
export default TutorialDataService;