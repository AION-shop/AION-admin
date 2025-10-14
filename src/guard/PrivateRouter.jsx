import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PrivateRouter = ({ children }) => {
    // const user = useSelector(state => state.user?.isAuth)
    const user = true
    const navigate = useNavigate()


    useEffect(() => {
        console.log("user: ", user)
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return children
}

export default PrivateRouter