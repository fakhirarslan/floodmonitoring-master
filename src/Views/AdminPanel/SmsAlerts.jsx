import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, FormGroup, Label, Input,
  Card, CardBody, CardHeader
} from "reactstrap";
import uuid from "uuid/v1";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

class SmsAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      modal: false,
      name: "",
      phone: "",
      text: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.usersList!==this.props.usersList){
      this.setState({ usersList: this.props.usersList })
    }
  }

  componentDidMount() {
    let th = this;
    const { firebase } = this.props;
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

  sendAlert = () => {
    let th = this;
    const { name, phone, text } = this.state;
    const body = {
        name: name, phone: phone, text: text
    }
    axios
      .post("http://localhost:3001/messages", body)
      .then(function(response) {
        toast.success("SMS sent successfully!", {
            position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(function() {
            th.setState({ modal: false })
        }, 1000);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  getUser = (name, phone) => {
    this.setState({ modal: true, name, phone })
  }

  handleMsg = (e) => {
      let text = e.target.value;
      if(text){
          this.setState({ text })
      }
  }

  render() {
    const { usersList, modal } = this.state;
    return (
      <div>
        <ToastContainer />
        <article className='out-card no-cb-padd'>
          <div className='space-2p5rem'></div>
          <Card>
            <CardHeader>Send SMS Alerts</CardHeader>
            <CardBody className='h5h-scroll'>
              <ListGroup>
                {usersList && usersList.length > 0
                  ? usersList.map(user => {
                      return (
                        <ListGroupItem color="success" key={uuid()}>
                          <div className="sms-alert-list">
                            <div>
                              <ListGroupItemHeading>{user.name}</ListGroupItemHeading>
                              <ListGroupItemText>{user.phone}</ListGroupItemText>
                            </div>
                            <Button color="success" onClick={() => this.getUser(user.name, user.phone)}>
                              Write Message
                            </Button>
                          </div>
                        </ListGroupItem>
                      );
                    })
                  : "loading..."}
              </ListGroup>
            </CardBody>
          </Card>
        </article>
        <div>
          <Modal isOpen={modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Write your message here!</ModalHeader>
            <ModalBody>
            <FormGroup>
                <Label for="exampleText">Type Area...</Label>
                <Input required type="textarea" name="text" id="exampleText" onChange={this.handleMsg}/>
            </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.sendAlert}>
                Send Alert
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default SmsAlerts;
