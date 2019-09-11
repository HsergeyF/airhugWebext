import axios from 'axios'
import config from '../axiosConfig';
import Avatar from 'react-avatar';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
} from 'react-vis';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { SocialIcon } from 'react-social-icons';
import Snackbar from '@material-ui/core/Snackbar';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:'',
    value:"income",
    statistic:false
  };
  }

  componentDidMount() {

  }
  deposit(){
    this.setState({alertText:'100 USD successfully deposited',showAlert:true})
  }
  withdraw(){
    this.setState({alertText:'Withdraw is currently unavailabele, because you are using testnet',showAlert:true})
  }




  switcher(reducer){
    this.props.dispatch({type:reducer});
  }

back()
{
  if(this.state.statistic == false){
    this.props.dispatch({type: 'CHOOSE_CABINET'});
  }
  else{
    this.setState({statistic:false})
  }
}

  render() {

const settting =
  <div>
  <div className='buttonsDWdiv'>
    <Button  onClick = {()=>this.deposit()} className='depositBtn'>
      <img src={require('../img/ArrowDwn.png')} className='dwnArrow'  />
       Deposit </Button>
     <Button onClick = {()=>this.withdraw()} className='depositBtn'>
      <img src={require('../img/ArrowUp.png')} className='dwnArrow'  />
      Withdraw </Button>
    </div>
    <p className='login_message'>Set up your donation amount</p>

    <img onClick = {()=>this.switcher('CHOOSE_PW')} src={require('../img/Key.png')} style ={{marginLeft:'22px',width: '15px',marginTop: '0px',height:' 15px',display:'inline-block'}}/>
    <a href = "#" onClick = {()=>this.switcher('CHOOSE_PW')} style = {{color:"#1978fa",display:'inline-block',width: '158px',height:' 20px',marginLeft:' 42px',marginTop: '0px',fontFamily: 'Roboto',fontStyle: 'normal',fontWeight: 'normal',fontSize: '16px',lineHeight: 'normal'}}> Change password</a>
    <div style ={{height:70,marginTop:300,width:260,marginLeft:20,position:"absolute"}}>
      <p style = {{display:'inline-block',width: '260px',height:' 20px',fontFamily: 'Roboto',fontStyle: 'normal',fontWeight: 'normal',fontSize: '16px',lineHeight: 'normal',color: '#303030'}}> Social networks</p>
      <img src={require('../img/add.png')} onClick = {()=>this.switcher('CHOOSE_SOCIAL')} style={{marginTop:10}} />
      <hr className="hr_vert"/>
      <SocialIcon onClick = {this.addVk} network="vk" style={{marginTop:10, position:"absolute",height:40, width: 40, marginLeft:20 }} />
      <SocialIcon onClick = {this.addVk} network="facebook" style={{marginTop:10, position:"absolute",height:40, width: 40, marginLeft:80 }} />
      <SocialIcon onClick = {this.addVk} network="instagram" style={{marginTop:10, position:"absolute",height:40, width: 40, marginLeft:140 }} />
      <img  src={require('../img/RightArrow.png')} style = {{marginTop:25,marginLeft:200,position:"absolute",color:'#6793D5'}}/>
    </div>
</div>

const greenData = [{x: 'Mo', y: 10}, {x: 'Tu', y: 5}, {x: 'We', y: 15},{x: 'Th', y: 1},{x: 'Fr', y: 25},{x: 'Sa', y: 15},{x: 'Su', y: 5}];

const stat =
  <div className='transBg'>
    <AppBar className='appbarImp' position="static" color="#6793D5">
            <Tabs
              className='transBg'
              value={this.state.value}
              onChange={(event, value) => {
                  this.setState({ value:value });
                }}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab value = "income" label="Income" />
              <Tab value = "outcome" label="Spendings" />
            </Tabs>
      </AppBar>

      <SwipeableViews
           axis={'x'}
           index={this.state.value}
           onChangeIndex={(event, value) => {
               this.setState({ value:value });
             }}
          >
        <div style = {{}}>
          <XYPlot xType="ordinal" width={300} height={100} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <VerticalBarSeries  data={greenData} />
          </XYPlot>
        </div>
          <Typography component="div" dir={'x'}>Item Two </Typography>
      </SwipeableViews>
          <Button onClick = {()=>this.login()} style ={{ width:'120px',color:"#fff" ,backgroundColor: '#1978fa',height:50,marginTop:5,marginLeft:20}}> Histogram </Button>
          <Button onClick = {()=>this.login()} style ={{ width:'120px',color:"#fff" ,backgroundColor: '#1978fa',height:50,marginTop:5,marginLeft:0}}> Linear </Button>
</div>

    return (
      <div className='main_div'>
        <div className='head_div' >
          <img   onClick = {()=>this.back()} src={require('../img/ArrowLeft.png')} className='back_arrow'/>
          <a href = "#" onClick = {()=>this.back()} className='comeback_link'> Come back</a>
        </div>

        <div  className = "account_middle">
          <Avatar src = {this.props.store.avatar} size="70" round = {true} className = 'avatar'/>
        </div>

        <div className = "account_middle">
          <p className='account_name'> {this.props.store.login==""?"User":this.props.store.login}</p>
          <p className='balance_name'> Your balance</p>
          <p className='balance_p'>{this.props.store.balance.toString().substring(0,this.props.store.balance.toString().indexOf(".")+2)} L</p>
        </div>

        <div className = "account_middle">
          {this.state.statistic?
            <div></div>:
            <img onClick = {()=>this.setState({statistic:true})} src={require('../img/Statistics.png')} className='arrowleft'/>
          }
        </div>
        { this.state.statistic?stat:settting}

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

export default connect(mapStateToProps)(Settings);
