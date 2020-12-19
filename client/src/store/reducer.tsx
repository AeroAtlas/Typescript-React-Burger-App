import Ingredients from "../Components/Burger/Ingredients";
import * as aTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
}

const reducer = (state: any = initialState, action: any): any => {
  switch(action.type){
    case aTypes.ADD_INGREDIENT:
      return {
        ...state, 
        ingredients: {
          ...state.ingredients, 
          [action.payload.ingName]: state.ingredients[action.payload.ingName] + 1
        }
      }
    case aTypes.REMOVE_INGREDIENT:
      return {
        ...state, 
        ingredients: {
          ...state.ingredients, 
          [action.payload.ingName]: state.ingredients[action.payload.ingName] - 1
        }
      }
    default: 
      return state
  }
} 

export default reducer;