const { ADD_TO_CART, UPDATE_CART, UPDATE_SHIPPING } = require("../constant/productConstants")

export function cartItems(state = { cartItems: [] }, action) {
 switch (action.type) {
  case UPDATE_SHIPPING:

   return {
    ...state,
    shipingData: action.payload
   }

  case ADD_TO_CART:
   const isFound = state.cartItems.find(item => item._id === action.payload._id)
   return isFound ? state : {
    cartItems: [...state.cartItems, action.payload]
   }
  case UPDATE_CART:
   {
    return {

     cartItems: action.payload
    }
   }


  default: {
   return state
  }
 }
}