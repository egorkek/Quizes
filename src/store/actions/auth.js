import axios from "axios";
import {AUTH_SUCCESS, LOGOUT} from "./actionTypes";

export function auth(email, password, isLogin) {
  return async (dispatch)=>{
    const authData={
      email, password, returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB62j0-6RNy0oaqL7TTo7DnyL-ybA0qOh4';
    if (isLogin){
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB62j0-6RNy0oaqL7TTo7DnyL-ybA0qOh4';
    }
    const response = await axios.post(url, authData);
    const data= response.data;
    const expirationDate = new Date(new Date().getTime() +data.expiresIn * 1000)
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);
    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      logout()
    }, time*1000)
  }
};

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: LOGOUT
  }
}

export function authSuccess(idToken) {
  return {
    type: AUTH_SUCCESS,
    idToken
  }
}

export function autoLogin() {
  return async dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout())
    }
    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()){
        dispatch(logout());
      }
      else {
        dispatch(authSuccess(token));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())/1000));
      }
    }
  }
}