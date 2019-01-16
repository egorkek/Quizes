import {AUTH_SUCCESS, LOGOUT} from "../actions/actionTypes";

const initialState={
    token:null

};

export default function authReducer(state=initialState,action) {

    switch (action.type) {
        default:
            return state;
        case AUTH_SUCCESS:
            return{
                ...state, token: action.idToken
            };
        case LOGOUT:
            return{
                ...state, token: null
            };

    }

}