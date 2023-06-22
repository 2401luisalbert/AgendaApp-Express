import axios from "axios";

const API = 'http://localhost:3000/api'

export const registerRequest = async userData =>  await axios.post(`${API}/register`, userData);


export const loginRequest = async userData => await axios.post(`${API}/login`, userData);
