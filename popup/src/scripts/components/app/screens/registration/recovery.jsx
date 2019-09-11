import axios from 'axios';
import config from '../axiosConfig';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class Recovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
    };
  }

  change(){
    let code = document.getElementById('code').value;
      axios(
        {
          method: 'post',
          url: config.baseUrl+ "/user/reset/password",
          data: {
          resetToken:this.props.store.recoveryToken,
          verifyCode:code
          }
        })
          .then((response) =>  {
            if(response.data.success == true){
              this.setState({showAlert:true,alertText:'Your new password is send to your email'})
            }
            else{
              this.setState({showAlert:true,alertText:'Error, incorrect verification code'})
            }
          })

  }
  back(){
    this.props.dispatch({type: 'CHOOSE_FORGOT'});
  }
render() {

  return (
    <div className='main_div'>

        <img src={require('../img/Logo.png')} className='login_logo'/>
        <p className='login_message'>
          Verification code is send to your email. Please enter the code in the form below.
          <br/>
          <br/>
          If you didn't receive the code, please Contact us for further assistance.
        </p>

        <p className="reg_p" style = {{width:200}}>Verify code</p>
        <input className="reg_input" id = "code"></input>

        <Button onClick = {()=>this.change()} className='login_button' > Get password </Button>
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

export default connect(mapStateToProps)(Recovery);
