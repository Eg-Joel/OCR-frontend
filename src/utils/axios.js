import axios from "axios";

const baseUrl = "https://aadhaar-ocr.onrender.com/api/" 
const instance =axios.create({
    baseURL:baseUrl,
})

export default instance