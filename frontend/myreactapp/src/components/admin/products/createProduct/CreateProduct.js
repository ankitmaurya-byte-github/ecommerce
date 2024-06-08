import React, { useEffect, useState } from "react";
import MetaData from "../../../home/MetaData";
import { Sidebar } from "../../dashboard/sidebar/Sidebar";
import './createproduct.scss'
import { RiImageAddFill } from "react-icons/ri";
import Carousel from "react-material-ui-carousel";
import fallbackImage from './fallback.png'
import axios from "axios";
const CreateProduct = () => {

 const [name, setName] = React.useState("dhdj");
 const [price, setPrice] = React.useState(400);
 const [description, setDescription] = React.useState("htjtrjjkj tyjt j");
 const [category, setCategory] = useState("sdfegs")
 const [productImages, setProductImages] = useState([])

 // useEffect(() => {
 //  console.log(productImages);
 // }, [productImages])

 const handelImageAdd = (e) => {
  console.log(e.target.files);//yeh object hai
  const files = Array.from(e.target.files);
  files.forEach((file) => {
   const reader = new FileReader();
   reader.onload = () => {
    if (reader.readyState === 2) {
     setProductImages((oldArray) => [...oldArray, reader.result]);
    }
   };
   reader.readAsDataURL(file);
  });
 };
 const handelsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.set("name", name);
  formData.set("price", price);
  formData.set("description", description);
  formData.set("category", category);
  productImages.forEach((image) => {
   formData.append("images", image);
  });

  try {
   const { data } = await axios.post("/app/v1/products/new", formData, {
    headers: {
     "Content-Type": "multipart/form-data",
    },
   });
   console.log(data);
  } catch (error) {
   console.error("Error creating product:", error);
  }

  // console.log(data);
 }

 return <div className="createProduct">

  <MetaData title={"create products"} />

  <div>
   <Sidebar />
  </div>
  <div className="mainbox">
   <form encType="multipart/form-data" onSubmit={handelsubmit} className="createProductForm">

    <h1>Create Product</h1>
    <div className="productImages">
     {productImages.length === 0 ? <img src={fallbackImage} alt="" /> : <Carousel>
      {productImages.map((items, i) => {
       return <img key={i} src={items} alt="" />
      })}
     </Carousel>}
     <label className="labelInput" htmlFor="productImages">
      <RiImageAddFill size={30} />
     </label>
     <input
      id="productImages"
      type="file"
      name="productImages"
      accept="image/*"
      multiple
      onChange={handelImageAdd}
      style={{ display: 'none' }}
     />
    </div>


    <div><input type="text" placeholder="name" required onChange={(e) => setName(e.target.value)} /></div>
    <div><input type="number" placeholder="Price" required onChange={(e) => setPrice(e.target.value)} /></div>
    <div><input type="text" placeholder="Discription" required onChange={(e) => setDescription(e.target.value)} /></div>
    <div>
     <select required onChange={(e) => setCategory(e.target.value)}>
      <option value="">Select Category</option>
      <option value="">Select Category</option>
      <option value="">Select Category</option>
      <option value="">Select Category</option>
      {/* Add options for categories here */}
     </select>
    </div>


    <button type="submit">
     Create
    </button>
   </form>

  </div>
 </div>;
};

export default CreateProduct;
