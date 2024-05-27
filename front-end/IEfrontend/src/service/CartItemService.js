import axios from 'axios';


class CartItemService {
    static BASE_URL = "http://localhost:8080"

    static async login(username, password){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {username, password})
            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async register(userData){
        try{

            const response = await axios.post(`${UserService.BASE_URL}/auth/userRegister`, userData)
            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async getAllUsers(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
        {
            headers: {Authorization: `Bearer ${token}`}
        })

            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async getYourProfile(token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
        {
            headers: {Authorization: `Bearer ${token}`}
        })

            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{

            const response = await axios.get(`${UserService.BASE_URL}/admin/get-user/${userId}`, 
        {
            headers: {Authorization: `Bearer ${token}`}
        })

            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async deleteUserById(userId, token){
        try{

            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
        {
            headers: {Authorization: `Bearer ${token}`}
        })

            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token){
        try{

            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
        {
            headers: {Authorization: `Bearer ${token}`}
        })

            return response.data;

        } catch (err){
            throw err;
        }
    }

    static async addToCart(username, productId, quantity, token) {
        try {
            const response = await axios.post(`${CartItemService.BASE_URL}/user/addToCart/${username}/${productId}`,quantity,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type" : "application/json"
                    }
                })
            return response.data;
        }catch (error){
            throw error;
        }
    };

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

export default CartItemService;