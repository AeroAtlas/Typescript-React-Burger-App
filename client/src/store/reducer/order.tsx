import * as aTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,

}


const reducer = (state: any = initialState, action: any): Object => {
  switch(action.type){
    case aTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case aTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({...action.orderData, id: action.orderId})
      }
    case aTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,

      };
    default:
      return state;
  }
}

export default reducer;