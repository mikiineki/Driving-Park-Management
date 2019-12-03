import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCarOrder, getCategories } from '../admin/apiAdmin';

const CarOrder = () => {

    const [values, setValues] = useState ({
        name: '',
        surname: '',
        startignLocation: '',
        finalLocation: '',
        from: '',
        to: '',
        categories: [],
        category: '',
        photo: '',
        loading: false,
        error: '',
        createdCarOrder: '',
        redirectToProfile: false,
        formData: ''
    })

    const {user, token} = isAuthenticated()

    const {
        name,
        surname,
        startignLocation,
        finalLocation,
        from,
        to,
        categories,
        category,
        loading,
        error,
        createdCarOrder,
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

        createCarOrder(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values, 
                    name: '',
                    surname: '',
                    startignLocation: '',
                    finalLocation: '',
                    from: '',
                    to: '',
                    photo:'',
                    loading: false,
                    createdCarOrder: data.name
                })
            }
        })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" values={name}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Surname</label>
                <input onChange={handleChange('surname')} type="text" className="form-control" values={surname}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Starting Location</label>
                <input onChange={handleChange('startingLocation')} type="text" className="form-control" values={startignLocation}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Final Location</label>
                <input onChange={handleChange('finalLocation')} type="text" className="form-control" values={finalLocation}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">From</label>
                <input onChange={handleChange('from')} type="text" className="form-control" values={from}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">To</label>
                <input onChange={handleChange('to')} type="text" className="form-control" values={to}></input>
            </div>

            

            <button className="btn btn-outline-primary">Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: createdCarOrder ? '' : 'none'}}>
            <h2> Your order is created!</h2>
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
        title="Create car order"
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

export default CarOrder;