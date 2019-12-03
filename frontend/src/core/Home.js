import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import {getCars} from './apiCore'
import Card from './Card'

const Home = () => {
        const [carsByArrival, setCarsByArrival] = useState([])
        const [error, setError] = useState(false)

    const loadCarsByArrival = () =>{
        getCars('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCarsByArrival(data)
            }
        })
    }

    useEffect (() => {
        loadCarsByArrival()
    }, [])

    return (
        <Layout title = "Home Page" description = "Driving Park Management" className="container-fluid">
            <h2 className="mb-4">List of cars</h2>
            <div className="row">
            {carsByArrival.map((car, i) => ( <Card key={i} car={car}></Card>))}
            </div>
        </Layout>
    )
}

export default Home;