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
import vk from '../img/Vk.png'
class Cabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:'',
    transactions:[]
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
                transactions.push({
                   date: item.created_at.substring(0,10),
                   amount:item.type=="create_account"?'0':parseInt(item.amount).toFixed(0),
                   to: item.type=="create_account"?'0':item.receive_info.name,
                   from:item.extra.transaction.sender_info.login,
                   hash:"https://steexp.com/tx/" +item.transaction_hash,
                   txhash:item.transaction_hash,
                   type: item.extra.transaction.extra
                })
              })
              this.setState({transactions:transactions})
            }
          })
  }

goTopage(reducer){
  this.props.dispatch({type:reducer});
}
openLink(link){
  var win = window.open(link, '_blank');
}
  render() {

    const loading = <div className='main_div'>
      <img src={require('../img/heartbeat.svg')} className='heart_a'/>
      <img src={require('../img/fingers.png')} className='fingersLoading_a'/>
      <p className='loading_p'> Waiting for your personal data ...</p>
    </div>

let lists = this.state.transactions.map(b =>
   <List key = {b.txhash}  component="div" style = {{ overflow:'auto',width:300,height:70}} disablePadding>
     <ListItem button onClick={()=>this.openLink(b.hash)} className='accountListItem'>
       <ListItemAvatar>
           <img src={vk} style = {{width:30}}/>
       </ListItemAvatar>
       <ListItem style={{marginLeft:40,marginTop:-10,position:"absolute"}}>
        <Avatar name = {b.from} color = "#6793D5" size="20" round = {true} />
        <ListItemText inset primary={b.from} />
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
          <a href = "#" onClick = {()=>this.goTopage('CHOOSE_SIGN_UP')} className='back_link'> Log out</a>
        </div>

        <div  className = "account_middle">
          <img src={this.props.store.avatar} className='avatar'/>
        </div>

        <div className = "account_middle">
          <p className='account_name'> {this.props.store.login==""?"User":this.props.store.login}</p>
          <p className='balance_name'> Your balance {lists.legth}</p>
          <p className='balance_p'>{this.props.store.balance.toString().substring(0,this.props.store.balance.toString().indexOf(".")+2)} L</p>
        </div>

        <div className = "account_middle">
          <img onClick = {()=>this.goTopage('CHOOSE_SETTINGS')}src={require('../img/RightArrow.png')}  className='arrowleft'/>
        </div>

        <div className='listDiv'>
          {lists.length ? lists: loading}
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
