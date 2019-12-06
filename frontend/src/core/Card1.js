import React from 'react'
import {useState, useEffect} from "react";
import { getCarOrders } from "./apiCore"

const Card1 = ({carorder}) => {

    const [carOrders, setCarOrders] = useState([])

    const loadCarOrders = () => {
        getCarOrders().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setCarOrders(data)
            }
        })
    }

    useEffect(() => {
        loadCarOrders()

    }, [])

    return (
        <div className="col-4 mb-3">
            <div className="card-header">Order Info</div>
            <div className="card-body">
                <p>Name: {carorder.name}</p>
                <p>Surname: {carorder.surname}</p>
                <p>Starting Location: {carorder.startingLocation}</p>
                <p>Final Location: {carorder.finalLocation}</p>
                <p>From(Date): {carorder.from}</p>
                <p>To(Date): {carorder.to}</p>
            </div>
        </div>
    )
}

export default Card1;