import axios from 'axios'
import config from '../axiosConfig';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class signUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
    };
  }

  registration()
  {
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let repeat = document.getElementById('repeat_password').value;
    if(login !==''  && login !== ' ' && password !== ''  && password !== ' ' && repeat !== ' ' && repeat !== ''){
      if (password === repeat){
        this.setState({ alertText:'Loading...',showAlert:true})
        axios({
          method: 'post',
          url:  config.baseUrl+"/user/signup",
          data: {
            login: login,
            password: password
          }
        }).then((response)=>{
          if (response.data.success === true){
            this.props.dispatch({ type: 'ADD_TOKEN',data: response.data.token});
            this.props.dispatch({type: 'LOGIN',data: login});
            this.props.dispatch({type: 'CHOOSE_SOCIAL'});
            this.setState({ alertText:'',showAlert:false})
          }else
          {
            this.setState({alertText:'Check the correctness of inputs',showAlert:true})
          }
        })
    }
    else
    {
      this.setState({ alertText:'Fill all inputs to continue',showAlert:true})
    }
  }
  else
  {
    this.setState({alertText:'Fill all inputs to continue',showAlert:true})
  }
}

switchLogin(){this.props.dispatch({type: 'CHOOSE_LOGIN'});}

render() {
  return (
    <div className='main_div'>

       <img src={require('../img/Logo.png')} className='login_logo'/>
       <p className='login_message'>Create your AirHug account</p>

       <p className="reg_p">Login</p>
       <input className="reg_input" id = "login"></input>

       <p className="reg_p">Password</p>
       <input className="reg_input" type="password" id = "password"></input>

       <p style = {{width: 140}} className="reg_p">Repeat password</p>
       <input className="reg_input" type="password" id = "repeat_password"></input>
       <Button className="signup_button" onClick = {()=>this.registration()} > Sign up </Button>
       <a href = "#" onClick = {()=>this.switchLogin()} className="login_link reg_p">Login</a>

      <Snackbar
                open={this.state.showAlert}
                onClose={()=>{this.setState({showAlert:false})}}
                ContentProps={{'aria-describedby': 'message-id'}}
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

export default connect(mapStateToProps)(signUp);
