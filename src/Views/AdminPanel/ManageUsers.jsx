import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button, CardHeader, Card, CardBody
} from "reactstrap";
import uuid from 'uuid/v1';
import axios from 'axios';

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
        usersList: []
    };
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

  deleteUser = (uid, name) => {
    let th = this;
    const body = {
        id : uid,
        name: name
    }
    axios.post('http://localhost:3001/deleteUser', body)
    .then(function (response) {
      th.setState({ usersList: response.data })
      th.props.getAllUsers()
    })
    .catch(function (error) {
     console.log(error);
    });
  }
  render() {
    const { usersList } = this.state;
    return <article className='out-card no-cb-padd'>
      <div className='space-2p5rem'></div>
      <Card>
        <CardHeader>Delete Users</CardHeader>
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
                        <Button color="danger" onClick={() => this.deleteUser(user.uid, user.displayName)}>
                          Delete
                        </Button>
                      </div>
                    </ListGroupItem>
                  );
                })
              : "loading..."}
          </ListGroup>
        </CardBody>
      </Card>
    </article>;
  }
}

export default ManageUsers;
