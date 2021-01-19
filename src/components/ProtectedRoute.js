import React, {useEffect} from 'react'
import {Route} from 'react-router-dom'

const ProtectedRoute = ({...props}) => {

    useEffect(() => {
    })


    return <Route {...props}  />
}
export default ProtectedRoute;