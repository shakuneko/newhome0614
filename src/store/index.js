  
import { createContext,useReducer  } from "react";
import products from "../json/products.json"
import Cookie from "js-cookie"
import { 
    SET_PAGE_TITLE,
    SET_NAVBAR_ACTIVEITEM,
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    SET_PRODUCT_DETAIL,
 } from "../utils/constants"
 

 export const StoreContext = createContext();
 let cartItems = Cookie.getJSON("cartItems");
 if (!cartItems) cartItems = [];

const initialState = {
    page: {
       title: "Your Home",
       products,
    },
      // cartItems,
      productDetail: {
         product: {
         color:[],
         },
         qty: 1,
         col:'None',
         colNum:0
         },
         
    navBar: {
      activeItem: "/",
      },
      cartItems,
 };
 
 function reducer(state, action) {
    switch (action.type) {
       case SET_PAGE_TITLE:
          return {
             ...state,
             page: {
                ...state.page,
                title: action.payload,
             },
          };
          case SET_NAVBAR_ACTIVEITEM:
            return {
               ...state,
               navBar: {
                  activeItem: action.payload
               }
            };

            case ADD_CART_ITEM:
                const item = action.payload;
                const product = state.cartItems.find((x) => x.id === item.id);
                if (product) {
                   cartItems = state.cartItems.map((x) =>
                      x.id === product.id ? item : x
                   );
                   return { ...state, cartItems };
                }
                cartItems = [...state.cartItems, item];
                return { ...state, cartItems };
             case REMOVE_CART_ITEM:
                cartItems = state.cartItems.filter((x) => x.id !== action.payload);
                return { ...state, cartItems };
                case SET_PRODUCT_DETAIL:
                  return { ...state, productDetail: action.payload };
             
             default:
                return state;
          }
       }
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

   return (
      <StoreContext.Provider value={value}>
         {props.children}
      </StoreContext.Provider>
   );
 }