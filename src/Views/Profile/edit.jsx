import React, { Component, Fragment } from 'react';
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Row, Col, FormGroup, Label } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from '../../Components/Firebase/firebaseSetup';
import axios from 'axios';
import { List } from 'react-content-loader'
import { toast, ToastContainer } from 'react-toastify';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null
    }
  }

  componentDidMount() {
    this.setState({ userDetails: firebase.auth().currentUser})
  }

  render() {
    const { userDetails } = this.state;
    return (
      <Fragment>
        <div className='theme-container'>
          {
            userDetails ? 
          <article className='edit-profile'>
            <h3><b>Edit Profile</b></h3>
            <hr />
            <Formik
              initialValues={{ name: userDetails ? userDetails.displayName : null, email: userDetails ? userDetails.email : null, phone: "", newPass: "", confirmPass: "" }}
              validate={values => {
                const errors = {};
                
                if (!values.phone){
                  errors.phone = "phone number field is empty.";
                } else if (!/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(values.phone)){
                  errors.phone = "number is invalid, must start with +92";
                }
                if (!values.newPass) {
                  errors.newPass = "password field is empty.";
                }else if (values.newPass.length < 8) {
                  errors.newPass = "password must be 8 digit.";
                }
                if(!values.confirmPass){
                  errors.confirmPass = "password must be 8 digit.";
                }
                if (values.newPass !== values.confirmPass) {
                  errors.confirmPass = "passwords don't match.";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
              let th = this
              const body = {
                  uid: userDetails.uid,
                  password: values.newPass,
                  phone: values.phone,
                  name: values.name,
                  email: values.email
              }
              axios.post('http://localhost:3001/editUser', body)
              .then(function (response) {
                toast.success("User Updated Successfully!", {
                  position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(() => {
                  th.props.history.push("/home")
                }, 2000)
              })
              .catch(function (error) {
               console.log(error);
              });
              }}
            >
              <Form>
                <ToastContainer />
                <h5 className='title-bottom-space'>Basic Information</h5>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>User Name</Label>
                      <div className="txt-field">
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Fakhir"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>New Phone Number</Label>
                      <div className="txt-field">
                        <Field
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="+923214695255"
                        />
                      </div>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Email Address</Label>
                      <div className="txt-field">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="fakhir@gmail.com"
                          readOnly
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <h5 className='title-bottom-space'>Change Password</h5>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>New Password</Label>
                      <div className="txt-field">
                        <Field
                          type="password"
                          name="newPass"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <ErrorMessage
                        name="newPass"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Confirm Password</Label>
                      <div className="txt-field">
                        <Field
                          type="password"
                          name="confirmPass"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <ErrorMessage
                        name="confirmPass"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <div className='button-row'>
                  <button className='button' type='submit'>Update Profile</button>
                  <Link className='button' to='/home'>Back to Home</Link>
                </div>
              </Form>
            </Formik>
          </article>
          : <List />
          }
        </div>
      </Fragment>
    );
  }
}

export default EditProfile;