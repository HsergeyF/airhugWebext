import axios from 'axios'
import config from '../axiosConfig';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { SocialIcon } from 'react-social-icons';
import Snackbar from '@material-ui/core/Snackbar';

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
  };
  }

  componentDidMount() {

  }
  addVk(access_token)
  {
    var newWin = window.open(config.baseUrl+"/oauth/vk/link?access_token="+access_token, "auth", "width=500,height=400");
  }
  next(){
    this.props.dispatch({type: 'CHOOSE_CABINET'});
  }

  render() {

    return (
      <div className='main_div'>

        <img src={require('../img/Logo.png')} className='login_logo'/>
        <p className='login_message'>Choose your social networks</p>

        <div className='socila_panel'>
          <SocialIcon network="vk" className='social_icon_location' onClick = {()=>this.addVk(this.props.store.access_token)}  />
          <SocialIcon network="facebook" className='social_icon_location'/>
          <SocialIcon network="instagram" className='social_icon_location' />
          <SocialIcon network="twitter"  className='social_icon_location' />
          <SocialIcon network="medium" className='social_icon_location' />
          <SocialIcon network="youtube" className='social_icon_location'/>
          <SocialIcon network="behance" className='social_icon_location'/>
          <SocialIcon network="github" className='social_icon_location' />
          <SocialIcon network="linkedin" className='social_icon_location' />
        </div>

        <Button onClick = {()=>this.next()} className='login_button'> Create Account </Button>

      </div>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.count
  };
};

export default connect(mapStateToProps)(Social);
