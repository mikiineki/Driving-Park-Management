import { getCarOrders } from "./apiCore"
import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import Card1 from './Card1'


const CarOrders = () => {
    const [carOrders, setCarOrders] = useState([])
    const [error, setError] = useState(false)

const loadCarOrders = () =>{
    getCarOrders('').then(data => {
        if(data.error) {
            setError(data.error)
        } else {
            setCarOrders(data)
        }
    })
}

useEffect (() => {
    loadCarOrders()
}, [])

return (
    <Layout title = "Orders Information" description = "Driving Park Management" className="container-fluid">
        <h2 className="mb-4">List of Orders</h2>
        <div className="row">
        {carOrders.map((carorder, i) => ( <Card1 key={i} carorder={carorder}></Card1>))}
        </div>
    </Layout>
)
}

export default CarOrders;