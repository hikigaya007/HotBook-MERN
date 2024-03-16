import axios from "axios";
import { RegisterFormData } from "./pages/Register";


export const register = async (formData: RegisterFormData) => {

    await axios.post("http://localhost:3000/api/auth/register" , formData)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        throw new Error(err.message);
    })

}