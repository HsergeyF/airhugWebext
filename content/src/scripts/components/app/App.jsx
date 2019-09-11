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

  clickSend(){
    this.setState({showAlert:true,alertText:"Sucess"})
  }
  createLogo(author){
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
           method: 'get',
           url: 'https://api.findinamika.com/api/account',
           headers: {
             'Authorizations': 'aa'
           }
         })
         .then((response) => {console.log(response)})
      alert('You huged '+author)
    };
    return respect;
  }
  componentDidMount() {
     if(window.location.href.includes('vk.com/feed')){
       var i = 0
       var authors = []
       var posts = document.getElementsByClassName('_post_content');
       for (var step = 0; step < posts.length; step++)  {
         authors.push(posts[step].getElementsByClassName('author')[0].innerHTML)
         let author = authors[step]
         let respect = this.createLogo(author)
         var a = posts[step].getElementsByClassName('like_cont ')[0]
         var b = a.getElementsByClassName('like_btns')[0]
         b.appendChild(respect)
         i++;
      }
      var target = document.querySelector('#main_feed');
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var post = document.getElementsByClassName('_post_content');
            for (var step = i; step < posts.length; step++)  {
              authors.push(posts[step].getElementsByClassName('author')[0].innerHTML)
              let author = authors[step]
              let respect = this.createLogo(author)
              var a = posts[step].getElementsByClassName('like_cont ')[0]
              var b = a.getElementsByClassName('like_btns')[0]
              b.appendChild(respect)
              i++;
           }
         });
       });
      var config = { attributes: true, childList: true, characterData: true };
      observer.observe(target, config);
    }else if(window.location.href.includes('youtube.com/watch?')){

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
