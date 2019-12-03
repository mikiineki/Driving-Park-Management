import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {createCar, getCategories} from './apiAdmin'
import {getCars, deleteCar} from './apiAdmin'

const ManageProducts = () => {
    
    const [cars, setCars] = useState([])

    const {user, token} = isAuthenticated()

    const loadCars = () => {
        getCars().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setCars(data)
            }
        })
    }

    const destroy = carId => {
        deleteCar(carId, user._id, token).then(data =>{
            if(data.error){
                console.log(data.error)
            } else {
                loadCars()
            }
        })
    }

    useEffect(() => {
        loadCars()

    }, [])

    return (
        <Layout title = "Manage Cars" description = "Driving Park Management" className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {cars.length} cars
                    </h2>
                    <hr></hr>
                    <ul className="list-group">
                        {cars.map((c, i) =>(
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{c.name}</strong>
                                <Link to={`/admin/car/update/${c._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span onClick={()=> destroy(c._id)} className="badge badge-danger badge-pill">
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
        </Layout>
    )
}

export default ManageProducts;