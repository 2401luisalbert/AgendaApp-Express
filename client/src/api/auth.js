import instance from "./axios"

export const registerRequest = async userData => await instance.post(`/register`, userData);

export const updateRegisterRequest = async (id, userData) => {
    console.log("id", id)
    console.log("userData", userData)
    return await instance.put(`/updateRegister/${id}`, userData)
}
export const loginRequest = async userData => await instance.post(`/login`, userData);

export const logoutRequest = async () => await instance.post(`/logout`);

export const verifyTokenRequest = async () => instance.get('/verify')

