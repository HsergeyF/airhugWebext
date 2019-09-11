import axios from 'axios';
import config from '../axiosConfig';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
    };
  }

login()
{
  let login = document.getElementById('login').value;
  let password = document.getElementById('password').value;
  if(login !==''  && login !== ' ' && password !== ''  && password !== ' '){
    axios({
      method: 'post',
      url: config.baseUrl+ "/user/login",
      data: {
        login: login,
        password: password}
      }).then((response)=>{
        if (response.data.success === true){
          let token =response.data.token
          let access_token =response.data.access_token
          this.props.dispatch({type: 'ADD_ACCESS_TOKEN',data: access_token});
          this.props.dispatch({type: 'ADD_TOKEN',data: token});
          this.props.dispatch({type: 'LOGIN',data: login});
          axios({
               method: 'get',
               url: config.baseUrl + '/account',
               headers: {
                 'Authorization': token
               }
            }).then((response) => {
               let balance = 0
               try{
                 response.data.balance.forEach(function(item, i, arr) {
                   if(item.asset_code == 'XLM'){
                     balance = item.balance
                   }
                 })
                this.props.dispatch({type: 'CHANGE_BALANCE',data:balance});
              }catch(e){
              }
               this.props.dispatch({type: 'CHANGE_AVATAR',data:config.baseUrl+'/uploads/'+response.data.user_info.avatar.filename});
               this.props.dispatch({type: 'CHOOSE_CABINET'});
             })
          this.setState({ alertText:'',showAlert:false})
        }
        else
        {
          this.setState({alertText:'User is not registered',showAlert:true})
        }
        })
    }
    else
    {
      this.setState({ alertText:'Fill all inputs to continue',showAlert:true})
    }

}
switcher(reducer){
  this.props.dispatch({type: reducer});
}

  render() {

    return (
      <div className='main_div'>
          <img  src={require('../img/Logo.png')} className='login_logo'/>
          <p className='login_message'>Please log in to your AirHug account to support your favorite bloggers</p>

          <p className="reg_p">Login</p>
          <input className="reg_input" id = "login"></input>

          <p className="reg_p">Password</p>
          <input type="password" className="reg_input" id = "password" ></input>

          <a href="#" onClick = {()=>this.switcher('CHOOSE_FORGOT')} className="login_forgot_p reg_p">Forgot your password?</a>
          <Button className='login_button' onClick = {()=>this.login()} > Login </Button>
          <a href="#" onClick = {()=>this.switcher('CHOOSE_SIGN_UP')} className="sign_up_link reg_p">Sign up</a>

          <Snackbar
                  open={this.state.showAlert}
                  onClose={()=>{this.setState({showAlert:false})}}
                  ContentProps={{'aria-describedby':'message-id'}}
                  message={<span id="message-id">{this.state.alertText}</span>}
                  />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.count
  };
};

export default connect(mapStateToProps)(Login);
