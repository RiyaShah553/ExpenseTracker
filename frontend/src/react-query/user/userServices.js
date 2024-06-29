import { getUserFromStorage } from '../../utils/getUserFromStorage';
import BASE_URL from '../../utils/url';
import axios from 'axios';


// ! Get the token
const token = getUserFromStorage();
// ! Login 
export const loginAPI = async ({ email, password }) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
    });

    // return a promise compulsory
    return response.data;
}


// ! register 
export const registerAPI = async ({ username, email, password }) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        username,
        email,
        password,
    });

    // return a promise compulsory
    return response.data;
}


// ! change password 
export const changePasswordAPI = async (newPassword) => {
    const response = await axios.put(`${BASE_URL}/users/change-password`, {
        newPassword,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}

// ! update profile 
export const updateProfileAPI = async ({ username, email }) => {
    const response = await axios.put(`${BASE_URL}/users/update-profile`, {
        username,
        email,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}