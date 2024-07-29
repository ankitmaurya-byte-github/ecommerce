import React, { useEffect, useState } from "react";
import MetaData from "../../../home/MetaData";
import { Sidebar } from "../../dashboard/sidebar/Sidebar";
import './createproduct.scss'
import { RiImageAddFill } from "react-icons/ri";
import Carousel from "react-material-ui-carousel";
import fallbackImage from '../fallback.png'
import axios from "axios";
import { createProduct } from "../../../../store/action/producAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../layout/loader/Loader2";
import { MdDeleteForever } from "react-icons/md";
const CreateProduct = () => {
 const { loading } = useSelector(state => state.newProduct)
 const [name, setName] = React.useState("fgh");
 const [price, setPrice] = React.useState(0);
 const [description, setDescription] = React.useState("fgh");
 const [category, setCategory] = useState("fgh")
 const [productImages, setProductImages] = useState([])
 const dispatch = useDispatch()

 const handelImageAdd = (e) => {
  console.log(e.target.files);//yeh object hai
  const files = Array.from(e.target.files);
  files.slice(0, 3)
  files.forEach((file) => {
   const reader = new FileReader();
   reader.onload = () => {
    if (reader.readyState === 2) {
     setProductImages((oldArray) => [reader.result, ...oldArray]);
    }
   };
   reader.readAsDataURL(file);
  });
  setProductImages((oldArray) => [...oldArray].slice(0, 3));
 };


 const handelsubmit = async (e) => {
  e.preventDefault();
  localStorage.clear()

  const formData = new FormData();
  formData.set("name", name);
  formData.set("price", price);
  formData.set("description", description);
  formData.set("category", category);
  productImages.forEach((image) => {
   formData.append("images", image);
  });
  dispatch(createProduct(formData))
  // try {
  //  const { data } = await axios.post("/app/v1/products/new", formData, {
  //   headers: {
  //    "Content-Type": "multipart/form-data",
  //   },
  //  });
  //  console.log(data);
  // } catch (error) {
  //  console.error("Error creating product:", error);
  // }

  // console.log(data);
 }

 return <div className="createProduct">

  <MetaData title={"create products"} />
  {loading && <Loader />}
  <div style={{ maxWidth: '200px' }}>
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
     <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <MdDeleteForever size={30} onClick={() => setProductImages([])} className="addDeleteIcon" />
      <label className="labelInput" htmlFor="productImages">
       <RiImageAddFill size={25} className="addDeleteIcon" />

      </label>
     </div>
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


    <div><input type="text" placeholder="name" value={name} required onChange={(e) => setName(e.target.value)} /></div>
    <div><input type="number" placeholder="Price" value={price} required onChange={(e) => setPrice(e.target.value)} /></div>
    <div><input type="text" placeholder="Discription" value={description} required onChange={(e) => setDescription(e.target.value)} /></div>
    <div>
     <select
      required={true}
      onChange={(e) => setCategory(e.target.value)}
      value={'bike'}
     >
      <option value="car">car</option>
      <option value="truck">truck</option>
      <option value="bike">bike</option>
      <option value="boat">boat</option>

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
