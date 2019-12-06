import { API } from '../config';

export const getCars = (sortBy) => {
    return fetch(`${API}/cars?sortBy=${sortBy}&order=desc&limit=10`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const getFilteredCars = (limit, filters = {}) => {
    const data = {
        limit, filters
    }
    return fetch(`${API}/cars/by/search`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }) 
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getCarOrders = () => {
    return fetch(`${API}/carorders`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}