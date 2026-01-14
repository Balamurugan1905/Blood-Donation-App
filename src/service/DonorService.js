import axios from "axios";

const REST_API_URL = 'https://saveone.onrender.com/donors';

export const listAllDonor = () => axios.get(REST_API_URL);

export const insertDonor = (donor) => axios.post(REST_API_URL, donor);

export const updateDonor = (id, donor) => axios.put(`${REST_API_URL}/${id}`, donor);

export const deleteDonor = (id) => axios.delete(`${REST_API_URL}/${id}`);
