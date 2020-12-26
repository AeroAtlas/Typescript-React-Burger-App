// import Ingredients from "../Components/Burger/Ingredients";
import * as aTypes from "../actions/actionTypes";
import { updateObject } from "../utility"; 

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

const changeIngredient = (state: any, action: any, modifier: any): Object => {
  const updatedIngredient = { [action.payload.ingName]: state.ingredients[action.payload.ingName] + (1 * modifier) }
  const ingredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients,
    totalPrice: state.totalPrice + (modifier * (INGREDIENT_PRICES as any)[action.payload.ingName]),
    purchaseable: Object.keys(ingredients)
      .map((igKey: string) => (ingredients as any)[igKey])
      .reduce((acc: number, curr: number): number => acc + curr)
  }
  return updateObject(state, updatedState)
}

const setIngredient = (state: any, action: any): Object => {
  const stateIngredients = {
    salad: action.payload.ingredients.salad,
    bacon: action.payload.ingredients.bacon,
    cheese: action.payload.ingredients.cheese,
    meat: action.payload.ingredients.meat
  }
  return updateObject(state, {
    ingredients: stateIngredients,
    error: false,
    totalPrice: initialState.totalPrice
  })
}

const reducer = (state: any = initialState, action: any): any => {
  switch(action.type){
    case aTypes.ADD_INGREDIENT: return changeIngredient(state,action,1)
    case aTypes.REMOVE_INGREDIENT: return changeIngredient(state,action,-1)
    case aTypes.SET_INGREDIENTS: return setIngredient(state,action)
    case aTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error:true})
    default: return state
  }
} 

export default reducer;