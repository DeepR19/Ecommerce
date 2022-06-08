import { Add_To_Cart, Remove_Cart_Item } from "../Constants/cartConstant"

export const cartReducer = (state = {cartItems : []}, action) =>{
    switch (action.type){
        case Add_To_Cart:
            const item = action.payload

            const isExist = state.cartItems.find(
                i => i.product === item.product     // here we checking item is present in cart or not
            );

            if(isExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map( i=>(
                        i.product === isExist.product ? item : i
                    ))
                }
            }else{
                return{
                    ...state,
                    cartItems : [...state.cartItems , item]
                };
            }
        
        case Remove_Cart_Item:
            return{
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

        default: 
         return state
    }
}