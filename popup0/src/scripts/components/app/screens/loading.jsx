import axios from 'axios';
import config from './axiosConfig';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
    };
  }


  render() {

    return (
      <div className='main_div'>
        <img src={require('./img/heartbeat.svg')} className='heart'/>
        <img src={require('./img/fingers.png')} className='fingersLoading'/>
        <p className='balance_name'> Getting your personal data ...</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.count
  };
};

export default connect(mapStateToProps)(Loading);
