import React, { Component } from 'react';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Button, CardHeader, Card, CardBody
  } from "reactstrap";
import uuid from 'uuid/v1';
import axios from 'axios';

class ChatUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            usersList: []
        }
    }

    componentDidMount() {
        let th = this;
        axios.get('http://localhost:3001/getAllUsers')
        .then(function (response) {
          let users = response.data.filter(u => u.email!=="admin@admin.com")
          th.setState({ usersList: users })
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() { 
    const { usersList } = this.state;
    const { handleWidget } = this.props;
    return <article className='out-card no-cb-padd'>
      <div className='space-2p5rem'></div>
      <Card>
        <CardHeader>Select User To Chat</CardHeader>
        <CardBody className='h5h-scroll'>
          <ListGroup>
            {usersList && usersList.length > 0
              ? usersList.map(user => {
                  return (
                    <ListGroupItem color="success" key={uuid()}>
                      <div className="sms-alert-list">
                        <div>
                          <ListGroupItemHeading>{user.displayName}</ListGroupItemHeading>
                          <ListGroupItemText>{user.email}</ListGroupItemText>
                        </div>
                        <Button color="success" onClick={() => handleWidget(user.displayName)}>
                          Chat
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
    }
}
 
export default ChatUsers;