import axios from "axios";
import {useEffect} from "react";
import {toast, Toaster} from "react-hot-toast";

export default function PaymentSuccess(){

    const paymentSuccess = async () =>{
        try {
            const response = await axios.get("http://localhost:8080/payment/success")
            if (response.status === 200){
                console.log(response.data)
                toast.success("Payment Success!")
            }
        } catch (error){
            console.log("Error: ",error);
        }

    }

    useEffect(() => {
        paymentSuccess()
    }, []);
    return(
        <div><h1>Payment Success!</h1>
            <Toaster/>
        </div>

    )
}