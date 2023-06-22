const API = "http://localhost:3000/api"

export const createRegiterRequest = (register) =>
    fetch(`${API}/register`, {
        method: 'POST',
        body: JSON.stringify(register),
        headers: {
            'Content-type': 'application/json'
        }
    })
