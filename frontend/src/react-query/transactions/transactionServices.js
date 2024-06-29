import BASE_URL from '../../utils/url';
import axios from 'axios';
import { getUserFromStorage } from '../../utils/getUserFromStorage'



// ! Get the token
const token = getUserFromStorage();


// ! add Transaction 
export const addTransactionAPI = async ({ type, category, date, description, amount }) => {
    const response = await axios.post(`${BASE_URL}/transaction/create`, {
        type,
        category,
        date,
        description,
        amount
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}


// ! fetch all 
export const listTransactionAPI = async ({ category, startDate, endDate, type }) => {
    const response = await axios.get(`${BASE_URL}/transaction/lists`, {
        params: { category, startDate, endDate, type },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}


// ! update Transaction
export const updateTransactionAPI = async ({ name, type, id }) => {
    const response = await axios.put(`${BASE_URL}/transaction/update/${id}`, {
        name,
        type,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}




// ! delete Transaction
export const deleteTransactionAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/transaction/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // return a promise compulsory
    return response.data;
}