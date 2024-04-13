const { ADD_TO_CART } = require("../constant/productConstants")

export function cartItems(state = { cartItems: [] }, action) {
 switch (action.type) {
  case ADD_TO_CART:
   const isFound = state.cartItems.find(item => item._id === action.payload._id)
   return isFound ? state : {
    cartItems: [...state.cartItems, action.payload]
   }



  default: {
   return state
  }
 }
}