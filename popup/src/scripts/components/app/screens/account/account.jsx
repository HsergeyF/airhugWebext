import axios from 'axios'
import config from '../axiosConfig';
import Avatar from 'react-avatar';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { SocialIcon } from 'react-social-icons';
import Snackbar from '@material-ui/core/Snackbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

class Cabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
  };
  }

  componentWillMount() {

    axios(
        {
          method: 'get',
          url:config.baseUrl+'/account/history/payments',
          headers: {
            'Authorization':  this.props.store.token
          }
          }).then((response) =>  {
            if(response.data.success === true){

              let transactions = []
              response.data.payments.forEach(function(item, i, arr){
                transactions.push({trtype:item.type,date: item.created_at.substring(0,10),
                   amount:item.type=="create_account"?'0':parseInt(item.amount).toFixed(0),
                   login: item.type=="create_account"?'0':item.receive_info.name,
                   person:item.type == 'create_account'?'Creator':item.to,
                  currency: typeof item.asset_code == 'undefined'?'XLM':item.asset_code=="RUB"?"₽":'XLM',
                  hash:"https://testnet.steexp.com/tx/" +item.transaction_hash,
                  txhash:item.transaction_hash,
                  type: item.type == "payment"?"Перевод":item.type == "path_payment"?"Валютный перевод":item.to == item.from?'Обмен валюты' : "Создание счёта"
                })
              })
            }
          })
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

  render() {

const transactions = [{social:'vk',reciever:'Sergey',date:'20-02-2019', amount:1},{social:'vk',reciever:'Sergey',date:'20-02-2019', amount:1},{social:'vk',reciever:'Sergey',date:'20-02-2019', amount:1},{social:'facebook',reciever:'Jane',date:'20-02-2019', amount:100},{social:'instagram',reciever:'Kate',date:'20-02-2019', amount:15}]

const lists = transactions.map(b =>
   <List key = {b.amount} component="div" style = {{ overflow:'auto',width:300,height:70}} disablePadding>

     <ListItem button className='accountListItem'>
       <ListItemAvatar>
         <SocialIcon network={b.social} style={{height:30,width:30}}/>
       </ListItemAvatar>

       <ListItem style={{marginLeft:40,marginTop:-10,position:"absolute"}}>
        <Avatar src = 'https://pp.userapi.com/c849132/v849132529/d3813/odoZUUukkbI.jpg?ava=1' size="20" round = {true} />
        <ListItemText inset primary={b.reciever} />
      </ListItem>

      <p style = {{position:'absolute',display:'inline-block',width: '140px',height:' 20px',marginLeft:' 60px',marginTop: '20px',fontFamily: 'Roboto',fontStyle: 'normal',fontWeight: 'normal',fontSize: '12px',lineHeight: 'normal',color: '#303030'}}> Incomig transfer</p>

      <ListItemSecondaryAction>
        <p style = {{fontFamily: 'Roboto',fontStyle: 'normal',fontWeight: 'bold',fontSize: '16px',lineHeight: 'normal',color: '#FF5D7D'}}>{b.amount} L</p>
      </ListItemSecondaryAction>
    </ListItem>

  </List>
)
    return (
      <div className='main_div'>
        <div className='head_div' >
          <a href = "#" onClick = {()=>this.swithcer('CHOOSE_SIGN_UP')} className='back_link'> Log out</a>
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
          <img onClick = {()=>this.switcher('CHOOSE_SETTINGS')}src={require('../img/RightArrow.png')}  className='arrowleft'/>
        </div>

        <div className='listDiv'>
          {lists}
        </div>

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

export default connect(mapStateToProps)(Cabinet);
