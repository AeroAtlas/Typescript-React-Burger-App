import axios from "axios";
import * as aTypes from "./actionTypes";


export const authStart = (): Object => {
  return {
    type: aTypes.AUTH_START
  }
} 

export const authSuccess = (authData: any): Object => {
  return {
    type: aTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFail = (error: Error): Object => {
  return {
    type: aTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email: String, password: String): Function => {
  return (dispatch: Function) => {
    dispatch(authStart());
    const authData = {
      email, password, returnSecureToken: true
    }
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`, authData)
      .then(res => {
        console.log(res.data);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      })
  }
}