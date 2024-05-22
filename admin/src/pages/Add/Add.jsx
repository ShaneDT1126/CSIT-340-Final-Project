import { useState } from 'react';
import toast, {Toaster}from 'react-hot-toast';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';


const Add = () => {
  
  const url = "http://localhost:8080/auth";
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState({
      name:"",
      description:"",
      price: "",
      category: "SHIRTS"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const uploadImage = async () => {
    if (image){
      const formData = new FormData();
      formData.append("image",image);
      const response = await axios.post(`${url}/uploadImage`, formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      });
      if (response.status === 200){
        setImageUrl(response.data)
      }else {
        console.log(response.status)
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    const productDetails = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: {
        name: data.category
      }
    }

    formData.append('productDetails', new Blob([JSON.stringify(productDetails)],{type:'application/json'}))
    formData.append('imageFile', image);

    try {
      const response = await axios.post(
          `${url}/addProduct`, formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"

            }

          }
      );
      console.log(response.data);

      if (response.status === 200) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "SHIRTS"
        });
        setImage(null);
        setImageUrl('');
        toast.success("Product Added Successfully");

      } else {
        console.log(response.data.error)
        toast.error("Error has Occurred")
      }
    }catch (error){
      console.log(error)
      toast.error("Error has Occurred!")
    }


  };
 
  return (
    <div className='add'>
      <form className = 'flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <h3>Upload Image</h3>

          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>
          </label>

          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />

        </div>

        <div className='add-product-name flex-col'>
          <p>Product Name</p>
            <input onChange = {onChangeHandler} value = {data.name} type ='text' name='name' placeholder='Type here'/>
        </div>  

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange = {onChangeHandler} value = {data.description} name='description' rows="6" placeholder='Write content here' />
        </div>
        
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange = {onChangeHandler} name='category'>
              <option value="SHIRTS">Shirts</option>
              <option value="BAGS">Bags</option>
              <option value="LANYARDS">Lanyards</option>
              <option value="JACKETS">Jackets</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange = {onChangeHandler} value = {data.price} type="Number" name='price' placeholder='₱20'/>
            <Toaster/>
            </div>
          </div>
          <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
