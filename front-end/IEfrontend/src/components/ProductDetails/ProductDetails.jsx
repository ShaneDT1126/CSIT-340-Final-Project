import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import CartItemService from "../../service/CartItemService.js";
import './ProductDetails.css';
import { toast, Toaster } from "react-hot-toast";


const ProductDetails = ({appUsername, productId}) => {
    const url = "http://localhost:8080/";
    const { id,username } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${url}public/getProductDetails/${id}`);
            setProduct(response.data.product);
            console.log(response.data.product);
        } catch (error) {
            console.log("error fetching data: ", error);
        }
    };

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await CartItemService.addToCart(appUsername, id, quantity, token);
            if (response.statusCode === 200) {
                toast.success("Added to Cart Successfully!");
                console.log("added to cart successfully");
            }
        } catch (error) {
            console.log("can't add to cart error: ", error);
        }
    };

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details">
            <button className="back-btn" onClick={() => navigate('/')}>⬅ Back</button>
            <img
                src={`http://localhost:8080/auth/getProductImage/${id}`}
                alt={product.name}
                className="product-image"
                onClick={handleImageClick}
            />
            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">₱{product.price}</p>
                <div className="product-quantity">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                    />
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <span className="close" onClick={handleCloseModal}>&times;</span>
                    <img
                        className="modal-content"
                        src={`http://localhost:8080/auth/getProductImage/${id}`}
                        alt={product.name}
                    />
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default ProductDetails;
