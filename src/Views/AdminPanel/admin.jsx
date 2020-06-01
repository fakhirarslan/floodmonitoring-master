import React, { Component } from "react";
import firebase from "../../Components/Firebase/firebaseSetup";
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import SmsAlerts from "./SmsAlerts";
import ManageUsers from "./ManageUsers";
import Landing from '../Landing/landing';
import { Widget, addResponseMessage, dropMessages,  toggleWidget } from "react-chat-widget";
import ChatUsers from "./ChatUsers";
import {toast, ToastContainer } from 'react-toastify';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTab: "1",
        usersList: [],
        messageList: [],
        openChat: false,
        selectedUser: null
    };
  }

  componentDidMount() {
    this.setState({ currentUser: firebase.auth().currentUser});
  }

  handleNewUserMessage = (newMessage) => {
    firebase.database().ref("Chats/").child(this.state.selectedUser).child("Admin").push(newMessage);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.messageList !== this.state.messageList){
      const filtered = this.state.messageList.filter( m => !prevState.messageList.includes(m))
      filtered && filtered.map(l => {
        addResponseMessage(l);
      })
    }
  }

  toggle = (tab) => {
      if(this.state.activeTab !== tab){
        this.setState({ activeTab: tab })
      }
  }

  handleWidget = (username) => {
    let th = this;
    this.setState({ openChat: !this.state.openChat, selectedUser: username }, () => {
      toast.success(`${username} selected for chat!`, {
        position: toast.POSITION.TOP_RIGHT
    });
    toggleWidget();
    firebase.database().ref("Chats/").child(username).child(username).on('value', message => {
      dropMessages();
      th.setState({
        messageList: message.val() ? Object.values(message.val()) : []
      });
    });
    })
  }

  getAllUsers = () => {
    let th = this;
    firebase
      .database()
      .ref("UserDetails/")
      .once("value", function(snapshot) {
        let users = snapshot.val() ? Object.values(snapshot.val()) : []
        users = [...new Map(users.map(item => [item["name"], item])).values()];
        users = users.filter(u => u.email!=="admin@admin.com")
        th.setState({ usersList: users});
      });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <article>
        <ToastContainer />
        <Nav tabs>
        <Widget handleNewUserMessage={this.handleNewUserMessage} title="Flood Monitoring App" subtitle="Welcome Admin" />
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Send Alerts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Manage Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              See Maps
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Chat With Users
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className='theme-container'>
              <Row>
                <Col sm="1" lg="1" />
                <Col sm="10" lg="10">
                  <SmsAlerts usersList={this.state.usersList} firebase={firebase}/>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className='theme-container'>
              <Row>
                <Col sm="1" lg="1" />
                <Col sm="10" lg="10">
                <ManageUsers getAllUsers={this.getAllUsers} firebase={firebase} />
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="3">
            {
              activeTab==="3" ? <Landing /> : null
            }
          </TabPane>
          <TabPane tabId="4">
            <ChatUsers handleWidget={this.handleWidget} />
          </TabPane>
        </TabContent>
      </article>
    );
  }
}

export default AdminPanel;
