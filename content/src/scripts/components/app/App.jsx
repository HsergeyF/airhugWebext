import axios from 'axios';
import Logo from "./like.png"
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showAlert: false,
    alertText:''
  };
  }


  createLogo(author,token,amount){
    let respect = document.createElement('a');
    let image = document.createElement('img');
    image.className = "respect";
    image.width = 20;
    image.height = 24;
    respect.setAttribute('style', "margin-left:10%;")
    image.setAttribute('src', chrome.extension.getURL("like.png"))
    respect.appendChild(image);
    respect.onclick = function () {
      axios({
           method: 'post',
           url: 'https://api.findinamika.com/api/account/payment/',
           headers: {
             'Authorization': token
           },
           data: {
             to: author,
             currency:"RUB",
             amount:amount,
             memo:'vk'
           }
         })
         .then((response) => {console.log(response)})

      alert('You huged '+author)
    };
    return respect;
  }


  collectUsers(posts){
    let users = []
    for (var step = 0; step < posts.length; step++)  {
     if( typeof posts[step].getElementsByClassName('post_image')[0] == 'undefined'){
       users.push(null)
      }
      else {
        users.push(posts[step].getElementsByClassName('post_image')[0].href.substring(15,posts[step].getElementsByClassName('post_image')[0].href.length))
      }
    }
    return users
  }


  componentDidMount() {
     if(window.location.href.includes('vk.com/feed')){
       let i = 0
       let authors = []
       let posts = document.getElementsByClassName('_post_content');
       let users = this.collectUsers(posts)
       axios({
            method: 'post',
            url: 'https://api.findinamika.com/api/oauth/vk/isset',
            headers: {
              'Authorization': this.props.count.token,
            },
            data:{
              list_id:users
            }
          })
          .then((response) => {
            for (var step = 0; step < response.data.result.length; step++)  {
              i++;
              if(response.data.result[step].isset){
                let respect = this.createLogo(response.data.result[step].login,this.props.count.token,this.props.count.donationAmount)
                let a = posts[i].getElementsByClassName('like_cont ')[0]
                let b = a.getElementsByClassName('like_btns')[0]
                b.appendChild(respect)
              }
            }
          })


      var target = document.querySelector('#main_feed');
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var post = document.getElementsByClassName('_post_content');
            let users = this.collectUsers(posts)
            
            for (var step = i; step < posts.length; step++)  {
              authors.push(posts[step].getElementsByClassName('author')[0].innerHTML)
              let author = authors[step]
              let respect = this.createLogo(author,this.props.count.token)
              var a = posts[step].getElementsByClassName('like_cont ')[0]
              var b = a.getElementsByClassName('like_btns')[0]
              b.appendChild(respect)
              i++;
           }
         });
       });

      var config = { attributes: true, childList: true, characterData: true };
      observer.observe(target, config);
    }
    else if(window.location.href.includes('youtube.com/watch?')){
      var video = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer');
    }
   }

  render() {
    return (
      <div>
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
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
