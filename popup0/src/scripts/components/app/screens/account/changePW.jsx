import axios from 'axios'
import config from '../axiosConfig';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class ChangePw extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
    };
  }

  componentDidMount() {

  }

  change(){
    let old = document.getElementById('old_pw').value;
    let new_pw = document.getElementById('new_pw').value;
    let repeat = document.getElementById('repeat_pw').value;

    if(new_pw==repeat){
      axios(
        {
          method: 'post',
          url: config.baseUrl+ "/user/update",
          headers: {
          'Authorization': this.props.store.token
          },
          data: {
          login: this.props.store.login,
          password:new_pw
        }
        })
          .then((response) =>  {

            if(response.data.success == true){
            this.setState({showAlert:true,alertText:'Password successfully changed'})
          }else{
            this.setState({showAlert:true,alertText:'Error, try again later'})
          }
          })}
          else{
            this.setState({showAlert:true,alertText:'Incorrect repeat password field'})
          }
  }
  back(){
    this.props.dispatch({
      type: 'CHOOSE_CABINET'
    });
  }
  
render() {
  return (
    <div className='main_div'>
      <img  onClick = {()=>this.back()} src={require('../img/ArrowLeft.png')} style = {{marginTop:25,marginLeft:20,position:"absolute",color:'#6793D5'}}/>
      <a href="#"  onClick = {()=>this.back()} style = {{textDecoration:'none',marginTop:20,width:90,marginLeft:40,height:50,position:"absolute",color:'#6793D5'}}className="reg_p">Come back</a>
      <p style ={{width: '260px',height: '20px',marginLeft: '20px',marginTop: '60px', display:'inline-block',fontFamily: 'Roboto',
        fontStyle: 'normal',fontWeight: 'bold',fontSize: '16px',lineHeight: 'normal',color: '#303030'}}>Change your password</p>
      <p className="reg_p" style = {{width:200}}>Old Password</p>
      <input className="reg_input" id = "old_pw"></input>
      <p className="reg_p" style = {{width:200}}> New Password</p>
      <input className="reg_input" id = "new_pw"></input>
      <p style = {{width: 200}}className="reg_p">Repeat New password</p>
      <input className="reg_input" id = "repeat_pw"></input>

      <Button onClick = {()=>this.change()} style ={{  display:'inline-block',
        width: '260px',
        fontWeight: 'bold',
        marginLeft: 20,
        height:50,
        color:"#fff",
        backgroundColor:"#1978fa",
        marginTop: '10px',}}> Change </Button>
      <Snackbar
                open={this.state.showAlert}
                onClose={()=>{this.setState({showAlert:false})}}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
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

export default connect(mapStateToProps)(ChangePw);
