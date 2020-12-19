// import Ingredients from "../Components/Burger/Ingredients";
import * as aTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
  purchaseable: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const reducer = (state: any = initialState, action: any): any => {
  let ingredients = {};
  switch(action.type){
    case aTypes.ADD_INGREDIENT:
      ingredients = {
        ...state.ingredients, 
        [action.payload.ingName]: state.ingredients[action.payload.ingName] + 1
      }
      return {
        ...state, 
        ingredients,
        totalPrice: state.totalPrice + (INGREDIENT_PRICES as any)[action.payload.ingName],
        purchaseable: Object.keys(ingredients)
          .map((igKey: string) => (ingredients as any)[igKey])
          .reduce((acc: number, curr: number): number => acc + curr)
      }
    case aTypes.REMOVE_INGREDIENT:
      ingredients = {
        ...state.ingredients, 
        [action.payload.ingName]: state.ingredients[action.payload.ingName] - 1
      }
      return {
        ...state, 
        ingredients,
        totalPrice: state.totalPrice - (INGREDIENT_PRICES as any)[action.payload.ingName],
        purchaseable: Object.keys(ingredients)
          .map((igKey: string) => (ingredients as any)[igKey])
          .reduce((acc: number, curr: number): number => acc + curr)
      }
    default: 
      return state
  }
} 

export default reducer;