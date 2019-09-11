const initialState = 0;
import store from './Store.js'
export default (state = store, action) => {
  switch (action.type) {
    /*Navigation reducers*/
    case 'CHOOSE_PW':
      return Object.assign({},state,{loginChosen:'changePW' });
    case 'CHOOSE_FORGOT':
        return Object.assign({},state,{loginChosen:'forgot' });
    case 'CHOOSE_RECOVERY':
        return Object.assign({},state,{loginChosen:'recovery' });
    case 'CHOOSE_LOGIN':
        return Object.assign({},state,{loginChosen:'login' });
    case 'CHOOSE_SIGN_UP':
        return Object.assign({},state,{loginChosen:'signUp' });
    case 'CHOOSE_SOCIAL':
        return Object.assign({},state,{loginChosen:'social' });
    case 'CHOOSE_CABINET':
        return Object.assign({},state,{loginChosen:'cabinet' });
    case 'CHOOSE_SETTINGS':
        return Object.assign({},state,{loginChosen:'settings' });
    /*Cabinet reducers*/
    case 'CHANGE_BALANCE':
      return Object.assign({},state,{balance:action.data });
    case 'LOGIN':
      return Object.assign({},state,{login:action.data });
    case 'CHANGE_RECOVERY_TOKEN':
      return Object.assign({},state,{recoveryToken:action.data });
    case 'ADD_TOKEN':
      return Object.assign({},state,{token:action.data });
    case 'ADD_ACCESS_TOKEN':
      return Object.assign({},state,{access_token:action.data });
    case 'CHANGE_AVATAR':
      return Object.assign({},state,{avatar:action.data });
    default:
      return state;
  }
};
