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