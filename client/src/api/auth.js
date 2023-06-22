import axios from "axios";

const API = 'http://localhost:3000/api'

export const registerRequest = async userData => {
    try {
        const response = await axios.post(`${API}/register`,userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}