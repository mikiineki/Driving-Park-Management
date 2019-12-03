import React from 'react'
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import {getCars, deleteCar} from '../admin/apiAdmin'

const Card = ({car}) => {

    const [cars, setCars] = useState([])

    const loadCars = () => {
        getCars().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setCars(data)
            }
        })
    }

    useEffect(() => {
        loadCars()

    }, [])

    return (
        <div className="col-4 mb-3">
            <div className="card-header">{car.name}</div>
            <div className="card-body">
                <ShowImage item={car} url="car"></ShowImage>
                <p>Chassis Number: {car.chassis}</p>
                <p>Engine Number: {car.engine}</p>
                <p>Engine Power: {car.enginePower}</p>
                <p>Car Fuel: {car.fuel}</p>
                <p>Year of Production: {car.year}</p>
                <Link to={`/viewcar/${car._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Car
                    </button>
                </Link>
                <Link to={`/carorder/${car._id}`}>
                <button className="btn btn-outline-warning mt-2 mb-2">
                        Create Order
                    </button>
                    </Link>
            </div>
        </div>
    )
}

export default Card;