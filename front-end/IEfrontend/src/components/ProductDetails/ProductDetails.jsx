import {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import CartItemService from "../../service/CartItemService.js";
import './ProductDetails.css'
import {toast, Toaster} from "react-hot-toast";
const ProductDetails = ({appUsername, productId}) => {
    const url = "http://localhost:8080/";
    const {id,username} = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const fetchProduct = async () =>{
        try {
            const response = await axios.get(`${url}public/getProductDetails/${id}`);
            setProduct(response.data.product);
            console.log(response.data.product);
        }catch (error){
            console.log("error fetching data: ",error)
        }
    };

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');

           const response = await CartItemService.addToCart(appUsername,id,quantity,token);
           if (response.statusCode === 200){
               toast.success("Added to Cart Successfully!")
               console.log("added to cart successfully");
           }
        } catch (error){
            console.log("can't add to cart error: ",error)
        }
    };


    useEffect(() => {
        fetchProduct();
    }, [id]);


    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details">
            <img src={`http://localhost:8080/auth/getProductImage/${id}`} alt={product.name}/>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>₱{product.price}</p>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                />
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <Toaster/>
        </div>
    );
};

export default ProductDetails;