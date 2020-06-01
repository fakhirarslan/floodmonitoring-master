import React, { Component, Fragment } from "react";
import DamsMap from "../Map/damsMap";
import { Widget, addResponseMessage, dropMessages } from "react-chat-widget";
import firebase from '../../Components/Firebase/firebaseSetup';
import ImageMap from "../Map/ImageMap";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: null,
        list: []
    };
  }

  componentDidMount() {
      dropMessages()
      this.setState({ currentUser: firebase.auth().currentUser})      
      firebase.database().ref("Chats/").child(firebase.auth().currentUser.displayName).child("Admin").on('value', message => {
        this.setState({
          list: message.val() ? Object.values(message.val()) : []
        });
      });
  }

  handleNewUserMessage = (newMessage) => {
    firebase.database().ref("Chats/").child(this.state.currentUser.displayName).child(this.state.currentUser.displayName).push(newMessage);
    firebase.database().ref("Messages/").push(`${this.state.currentUser.displayName} sent a message`);
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevState.list !== this.state.list){
        const filtered = this.state.list.filter( m => !prevState.list.includes(m))
        filtered && filtered.map(l => {
            addResponseMessage(l);
        })
      }
  }

  render() {
    console.log(this.props.mapType)
    return (
      <Fragment>
        <Widget handleNewUserMessage={this.handleNewUserMessage} title="Flood Monitoring App" subtitle={`Welcome ${this.state.currentUser && this.state.currentUser.displayName}`} />
        {
          this.props.mapType === "MapLayer"?
          <DamsMap />
          :
          <ImageMap />
        }
      </Fragment>
    );
  }
}

export default Landing;
