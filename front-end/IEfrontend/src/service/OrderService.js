import axios from "axios";

class OrderService{
    static BASE_URL = "http://localhost:8080";



    static async addOrder(username, token){
        try {
            const response = await axios.post(`${OrderService.BASE_URL}/user/addOrder/${username}`,null,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
            return response.data;
        } catch (error){
            console.log("Error occurred: ", error);
        }
    }


}
export default OrderService;