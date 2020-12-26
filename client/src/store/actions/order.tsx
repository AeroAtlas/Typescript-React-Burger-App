import * as aTypes from "./actionTypes";
import axios from "../../axios-order";


export const purchaseBurgerSuccess = (id: Number, orderData: Object): Object => {
  return {
    type: aTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
} 

export const purchaseBurgerFail = (error: Error): Object => {
  return {
    type: aTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = (): Object => {
  return {
    type: aTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData: Object) => {
  return (dispatch: Function) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then((res: any): void => { 
        console.log(res)
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch((err: Error): void => {
        dispatch(purchaseBurgerFail(err))
      });
  }
}

export const purchaseInit = (): Object => {
  return {
    type: aTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders: any): Object => {
  return {
    type: aTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error: Error): Object => {
  return {
    type: aTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: aTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return (dispatch: Function): void => {
    dispatch(fetchOrdersStart())
    axios.get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for(let key in res.data){
          fetchedOrders.push({...res.data[key], id: key});
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })
    }
}