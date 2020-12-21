import * as aTypes from "./actionTypes";

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