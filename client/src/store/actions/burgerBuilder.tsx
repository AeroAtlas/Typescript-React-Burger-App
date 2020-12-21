import * as aTypes from "./actionTypes";
import axios from '../../axios-order';

export const addIngredient = (name: any): any => {
  return {
    type: aTypes.ADD_INGREDIENT,
    payload: {ingName: name}
  }
}

export const removeIngredient = (name: any): any => {
  return {
    type: aTypes.REMOVE_INGREDIENT,
    payload: {ingName: name}
  }
}

export const setIngredients = (ingredients: any): any => {
  return {
    type: aTypes.SET_INGREDIENTS,
    payload: {ingredients}
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: aTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return (dispatch: any): any => {
    axios.get('https://burger-app-c0e9b.firebaseio.com/ingredients.json')
      .then((res: any): any => {
        dispatch(setIngredients(res.data))
      })
      .catch((err: any): any => {
        dispatch(fetchIngredientsFailed())
      });
  }
}