import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import {getCar, createCarOrder} from '../admin/apiAdmin'
import ShowImage from './ShowImage'
import { isAuthenticated } from "../auth";

const ViewCar = ({match}) => {

    const [car, setCar] = useState([])

    const loadCar = carId => {
        getCar(carId).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setCar(data)
                console.log(data)
            }
        })
    }

    useEffect(() => {
        loadCar(match.params.carId)

    }, [])

    
    return (
        <Layout title = "Vehicle Information" description = "Driving Park Management" className="container-fluid">
            <div className="row">
                <div className="col-4"></div>
                <div className="card-body">
            </div>
            </div>
            <div>
            <div className="card-header">{car.name}</div>
                <ShowImage item={car} url="car"></ShowImage>
                <p>Chassis Number: {car.chassis}</p>
                <p>Engine Number: {car.engine}</p>
                <p>Engine Power: {car.enginePower}</p>
                <p>Car Fuel: {car.fuel}</p>
                <p>Year of Production: {car.year}</p>
            </div>

            
        </Layout>
    )
}

export default ViewCar;