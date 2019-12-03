import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Menu from './core/Menu'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddCar from './admin/AddCar'
import ManageCars from './admin/ManageCars'
import UpdateCar from './admin/UpdateCar'
import CarOrder from './core/CarOrder'
import ViewCar from './core/ViewCar'

const Routes = () => {
    return (
    <BrowserRouter>
    <Menu></Menu>
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/carorder/:carId" exact component={CarOrder}></Route>
            <Route path="/viewcar/:carId" exact component={ViewCar}></Route>
            <Route path="/signin" exact component={Signin}></Route>
            <Route path="/signup" exact component={Signup}></Route>
            <PrivateRoute path="/user/dashboard" exact component={Dashboard}></PrivateRoute>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
            <AdminRoute path="/create/category" exact component={AddCategory}></AdminRoute>
            <AdminRoute path="/create/car" exact component={AddCar}></AdminRoute>
            <AdminRoute path="/admin/cars" exact component={ManageCars}></AdminRoute>
            <AdminRoute path="/admin/car/update/:carId" exact component={UpdateCar}></AdminRoute>
        </Switch>
    </BrowserRouter>)
}

export default Routes;