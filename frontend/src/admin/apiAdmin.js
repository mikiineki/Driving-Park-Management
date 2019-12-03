import { API } from '../config';

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }) 
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const createCar = (userId, token, car) => {
    return fetch(`${API}/car/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: car
    }) 
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
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

export const getCars = () => {
    return fetch(`${API}/cars?limit=undefined`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const deleteCar = (carId, userId, token) => {
    return fetch (`${API}/car/${carId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getCar = (carId) => {
    return fetch(`${API}/car/${carId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const updateCar = (carId, userId, token, car) => {
    return fetch (`${API}/car/${carId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: car
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const createCarOrder = ( userId, token, carorder) => {
    return fetch(`${API}/createorder/${userId}`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: carorder
    }) 
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}