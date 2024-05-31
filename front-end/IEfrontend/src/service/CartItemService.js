import axios from 'axios';


class CartItemService {
    static BASE_URL = "http://localhost:8080"


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

    static async getUserCart(username, token) {
        try {
            const response = await axios.get(`${CartItemService.BASE_URL}/user/getCart/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;

        } catch (error){
            throw error;
        }
    };

    static async getTotalAmount(username, token) {
        try {
            const response = await axios.get(`${CartItemService.BASE_URL}/user/getCartTotal/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
            return response.data;
        } catch (error){
            throw error;
        }
    }

}

export default CartItemService;