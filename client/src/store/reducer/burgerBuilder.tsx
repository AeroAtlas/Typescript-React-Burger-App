// import Ingredients from "../Components/Burger/Ingredients";
import * as aTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  purchaseable: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const reducer = (state: any = initialState, action: any): any => {
  console.log(action.ingredients)
  // const stateIngredients = {salad: action.ingredients.salad, bacon: action.ingredients.bacon, cheese: action.ingredients.cheese, meat: action.ingredients.meat}
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
    case aTypes.SET_INGREDIENTS:
      return {
        ...state, ingredients: action.payload.ingredients, error: false
      }
    case aTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state, error: true
      }
    default: 
      return state
  }
} 

export default reducer;