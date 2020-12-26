import * as aTypes from "../actions/actionTypes";
import { updateObject } from "../utility"; 
const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseBurgerSuccess = (state:any,action:any): Object => {
  const newOrders = state.orders.concat({...action.orderData, id: action.orderId})
  return updateObject(state, {loading: false, purchased: true, orders: newOrders})
}

const reducer = (state: any = initialState, action: any): Object => {
  switch(action.type){
    case aTypes.PURCHASE_INIT: return updateObject(state, {purchased: false})
    case aTypes.PURCHASE_BURGER_START: return updateObject(state, {loading: true})
    case aTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
    case aTypes.PURCHASE_BURGER_FAIL: return updateObject(state, { loading: false })
    case aTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true })
    case aTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, { orders: action.orders, loading: false })
    case aTypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false })
    default: return state;
  }
}

export default reducer;