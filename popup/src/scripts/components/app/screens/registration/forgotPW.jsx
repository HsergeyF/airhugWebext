import axios from 'axios'
import config from '../axiosConfig';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
    };
  }

  change(){
    let login = document.getElementById('login').value;
      axios(
        {
          method: 'post',
          url: config.baseUrl+ "/user/reset/verify-code",
          data: {
          email_address: login
          }
        })
          .then((response) =>  {
            if(response.data.success == true){
              this.props.dispatch({type: 'CHANGE_RECOVERY_TOKEN',data:response.data.resetToken});
              this.props.dispatch({type: 'CHOOSE_RECOVERY'});
            }else{
            this.setState({showAlert:true,alertText:'Error, incorrect email adress'})
            }
          })

  }
  back(){
    this.props.dispatch({type: 'CHOOSE_LOGIN'});
  }

  render() {

  return (
    <div className='main_div'>

        <img src={require('../img/Logo.png')} className='login_logo'/>
        <p className='login_message'>
          Please enter your AirHug login. We send the password reset instructions to the email address for this account.
          <br/>
          <br/>
          If you don't know the login, please Contact us for further assistance.
        </p>

        <p className="reg_p" style = {{width:200}}>Login</p>
        <input className="reg_input" id = "login"></input>

        <Button onClick = {()=>this.change()} className='login_button'> Email me </Button>
        <a href = "#" onClick = {()=>this.back()} className="login_link reg_p">Back</a>

      <Snackbar
              open={this.state.showAlert}
              onClose={()=>{this.setState({showAlert:false})}}
              ContentProps={{'aria-describedby': 'message-id',}}
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

export default connect(mapStateToProps)(Forgot);
