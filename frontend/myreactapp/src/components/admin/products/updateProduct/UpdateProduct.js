import React, { useEffect, useState } from "react";
import MetaData from "../../../home/MetaData";
import { Sidebar } from "../../dashboard/sidebar/Sidebar";
import './updateproduct.scss'
import { RiImageAddFill } from "react-icons/ri";
import Carousel from "react-material-ui-carousel";
import fallbackImage from '../fallback.png'
import axios from "axios";
import { clearProductDetail, createProduct, getProductDetail, updateproduct } from "../../../../store/action/producAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../layout/loader/Loader2";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useAlert } from "react-alert";
const UpdateProduct = () => {
 const navigate = useNavigate();
 const alert = useAlert();
 const { loading: newpl } = useSelector(state => state.newProduct)
 const { id } = useParams()
 const { error, loading: pdl, product: data } = useSelector(state => state.productDetail)
 let loading = newpl || pdl;
 const [name, setName] = React.useState("");
 const [price, setPrice] = React.useState(0);
 const [description, setDescription] = React.useState("");
 const [category, setCategory] = useState("")
 const [productImages, setProductImages] = useState([])
 const dispatch = useDispatch()

 useEffect(() => {
  if (data.images) {
   console.log("data", data);
   setName(data.name);
   setPrice(data.price);
   setDescription(data.description);
   setCategory(data.category);
   let images = data.images.map((item) => item.url)
   setProductImages(images);
  }

 }, [data])

 useEffect(() => {
  console.log("error");
  if (error) {
   alert.error("User not found");
   navigate(-1);
  }

  console.log("product");
  dispatch(getProductDetail(id))

  return () => {
   console.log("clearing product detail");
   dispatch(clearProductDetail())
  };

 }, [error]);
 const handelImageAdd = (e) => {
  console.log(e.target.files);//yeh object hai
  const files = Array.from(e.target.files);

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

  const formData = new FormData();
  formData.set("name", name);
  formData.set("price", price);
  formData.set("description", description);
  formData.set("category", category);
  productImages.forEach((image) => {
   formData.append("images", image);
  });
  dispatch(updateproduct({ formData, id }))
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

  <MetaData title={"Update products"} />
  {loading && <Loader />}
  <div style={{ maxWidth: '200px' }}>
   <Sidebar />
  </div>
  <div className="mainbox">
   <form encType="multipart/form-data" onSubmit={handelsubmit} className="createProductForm">

    <h1>Update Product</h1>
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

     >
      {/* <option value="">Select a category</option> */}
      <option value="car">{category}</option>
      <option value="truck">truck</option>
      <option value="bike">bike</option>
      <option value="boat">boat</option>
     </select>
    </div>


    <button type="submit">
     Update
    </button>
   </form>

  </div>
 </div>;
};

export default UpdateProduct;
