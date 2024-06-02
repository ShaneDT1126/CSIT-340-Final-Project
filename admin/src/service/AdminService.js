import axios from 'axios';
import {toast} from "react-hot-toast";

class AdminService{
    static BASE_URL = "http://localhost:8080"

    static async login(username, password){
        try{

            const response = await axios.post(`${AdminService.BASE_URL}/auth/login`, {username, password});
            if (response.data.statusCode === 500){
                toast.error("Wrong Username or Password!");
            }else {
                toast.success("Login Success!");
            }
            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async register(userData){
        try{

            const response = await axios.post(`${AdminService.BASE_URL}/auth/adminRegister`, userData)
            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async changeOrderStatus(orderId, status){
        try {
            const response = await axios.put(`${AdminService.BASE_URL}/auth/changeOrderStatus/${orderId}`,status);
            return response.data;
        }catch (error){
            console.log("Error: ", error)
            throw error;

        }
    }


    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }
    
    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }


}

export default AdminService;