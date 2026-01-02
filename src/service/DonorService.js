import axios from "axios";

const REST_API_URL = 'https://saveone.onrender.com/donors'

export const listAllDonor = () => axios.get(REST_API_URL)

export const insertDonor = (Donor) => axios.post(REST_API_URL,Donor)