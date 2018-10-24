import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, parseInt(expirationTime, 10) * 1000);
    }
}

export const auth = (email, password, isSignup)  => {
    return dispatch => {
        dispatch(authStart());

        const credential = {
            email,
            password,
            returnSecureToken: true
        };

        const signupURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDh-RybjpgnDTfKGyzWZwe_4wpOhx6BbKA';
        const signinURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDh-RybjpgnDTfKGyzWZwe_4wpOhx6BbKA';

        axios.post(isSignup ? signupURL : signinURL, credential)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
                console.log(err);
            })
    };
};