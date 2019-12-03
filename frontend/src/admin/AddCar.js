import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import {createCar, getCategories} from './apiAdmin'

const AddCar = () => {

    const [values, setValues] = useState ({
        name: '',
        chassis: '',
        engine: '',
        enginePower: '',
        fuel: '',
        year: '',
        categories: [],
        category: '',
        photo: '',
        loading: false,
        error: '',
        createdCar: '',
        redirectToProfile: false,
        formData: ''
    })

    const {user, token} = isAuthenticated()

    const {
        name,
        chassis,
        engine,
        enginePower,
        fuel,
        year,
        categories,
        category,
        loading,
        error,
        createdCar,
        redirectToProfile,
        formData
    } = values

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, error: false})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, error: '', loading: true})

        createCar(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values, 
                    name:'', 
                    chassis:'',
                    engine:'',
                    enginePower:'',
                    fuel:'',
                    year:'',
                    photo:'',
                    loading: false,
                    createdCar: data.name
                })
            }
        })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"></input>
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" values={name}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Chassis Number</label>
                <input onChange={handleChange('chassis')} type="number" className="form-control" values={chassis}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Engine Number</label>
                <input onChange={handleChange('engine')} type="number" className="form-control" values={engine}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Engine Power</label>
                <input onChange={handleChange('enginePower')} type="text" className="form-control" values={enginePower}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Fuel Type</label>
                <select onChange={handleChange('fuel')} type="text" className="form-control" values={fuel}>
                    <option value="">Please Select Fuel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Gas">Gas</option>
                    <option value="Electricity">Electricity</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">The Year of Production </label>
                <input onChange={handleChange('year')} type="text" className="form-control" values={year}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control" >
                    <option>Please Select Category</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>

            <button className="btn btn-outline-primary">Create Car</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: createdCar ? '' : 'none'}}>
            <h2>{`${createdCar}`} is created!</h2>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )

    return (
        <Layout
        title="Create Vehicle"
        description={`Welcome ${user.name}!`}>
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>
    </Layout>
    )
}

export default AddCar;