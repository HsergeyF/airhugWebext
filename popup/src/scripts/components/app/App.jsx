import {connect} from 'react-redux';
import React, {Component} from 'react';

import Login from './screens/registration/login.jsx';
import SignUp from './screens/registration/signUp.jsx';
import Forgot from './screens/registration/forgotPW.jsx';
import Recovery from './screens/registration/recovery.jsx';
import Social from './screens/registration/social.jsx';

import Settings from './screens/account/settings.jsx';
import ChangePW from './screens/account/changePW.jsx';
import Cabinet from './screens/account/account.jsx';


import './screens/style.css';

class App extends Component {
  constructor(props) {
    super(props);
      }

  render() {
    const recovery = <Recovery/>
    const login = <Login/>
    const signUp = <SignUp/>
    const settings = <Settings/>
    const social = <Social/>
    const cabinet = <Cabinet/>
    const forgot = <Forgot/>
    const changePW = <ChangePW/>
    return (
      <div>
        {this.props.count.loginChosen =='forgot'?forgot:
         this.props.count.loginChosen =='login'?login:
         this.props.count.loginChosen =='signUp'?signUp:
         this.props.count.loginChosen =='social'?social:
         this.props.count.loginChosen =='changePW'?changePW:
         this.props.count.loginChosen =='settings'?settings:
         this.props.count.loginChosen =='recovery'?recovery:
         cabinet}
      </div>    )
  }
}
const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
