import axios from "axios"



const request = axios.create({
    baseURL : "https://booking-app-mern-backend.onrender.com"
})

export default request