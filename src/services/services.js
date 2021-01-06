import axios from "axios"

const ApiClient = axios.create({
    baseURL: 'http://localhost:3000/data',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getData(){
        return ApiClient.get('')
    }
}