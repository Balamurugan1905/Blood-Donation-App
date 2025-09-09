import axios from "axios";

const REST_API_URL = 'http://localhost:8080/donors'

export const listAllDonor = () => axios.get(REST_API_URL)

export const insertDonor = (Donor) => axios.post(REST_API_URL,Donor)