import React, { useEffect } from 'react';
import { FaShippingFast, FaBoxOpen, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import './orderDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { oderDetailAction } from '../../../../store/action/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../layout/loader/Loader';
import MetaData from '../../MetaData';

const OrderDetails = () => {
 const { id } = useParams();
 let { loading, error, order } = useSelector((state) => state.orderDetail);
 console.log(id);
 const navigate = useNavigate();
 const dispatch = useDispatch()
 useEffect(() => {
  if (error) {
   alert.error(error);
  }
  dispatch(oderDetailAction(id))
 }, []);
 // const order = {
 //  _id: "664817703fe4b3106cb9cc18",
 //  itemsPrice: 0,
 //  taxPrice: 0,
 //  shippingPrice: 0,
 //  totalPrice: 4041.5,
 //  orderStatus: "Processing",
 //  shippingInfo: {
 //   pincode: 345636536,
 //   country: "AD",
 //   state: "08"
 //  },
 //  orderItems: [
 //   {
 //    _id: "65a643e2ed926836700cdb1b",
 //    name: "wcxea",
 //    price: 1466,
 //    quantity: 1,
 //    image: "https://via.placeholder.com/150"
 //   },
 //   {
 //    _id: "65a643e2ed926836700cdad4",
 //    name: "inrbn",
 //    price: 32,
 //    quantity: 1,
 //    image: "https://via.placeholder.com/150"
 //   },
 //   {
 //    _id: "65a643e2ed926836700cdb2f",
 //    name: "lvgrx",
 //    price: 1927,
 //    quantity: 1,
 //    image: "https://via.placeholder.com/150"
 //   }
 //  ],
 //  paidAt: "2024-05-18T02:50:24.870Z",
 //  user: "65ab6a3f7bdd452ed4f8f1fa",
 //  createdAt: "2024-05-18T02:50:24.898Z",
 //  __v: 0
 // };

 return (
  <>
   {loading || !order ? <Loader /> :
    <div className="order-component">
     <MetaData title={"Order Details"} />
     <div className="order-header">
      <h2>Order Details <FaBoxOpen /></h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.orderStatus}</p>
      <p><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()} <FaCheckCircle /></p>
      <p><strong>Total Price:</strong> ${order.totalPrice} <FaDollarSign /></p>
     </div>

     <div className="shipping-info">
      <h3>Shipping Information <FaShippingFast /></h3>
      <p><strong>Pincode:</strong> {order.shipingInfo.pincode}</p>
      <p><strong>Country:</strong> {order.shipingInfo.country}</p>
      <p><strong>State:</strong> {order.shipingInfo.state}</p>
     </div>

     <div className="order-items">
      <h3>Order Items</h3>
      <ul>
       {order.orderItem.map(item => (
        <li onClick={() => navigate(`/product/${item._id}`)} key={item._id} className="order-item">
         <img src={item?.Image} alt={item.name} />
         <div className="item-details">
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
         </div>
        </li>
       ))}
      </ul>
     </div>
    </div>}
  </>
 );
};

export default OrderDetails;

