import {create} from "apisauce"

const token = localStorage.getItem('token')

// baseURL: 'https://energycommissionbackend.herokuapp.com/',
const api = create({
    baseURL: 'http://localhost:9000',
    headers: {"Authorization": `Bearer ${token}`}
})

export default api;