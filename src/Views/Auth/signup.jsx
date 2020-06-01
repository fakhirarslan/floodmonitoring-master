import React, { Component } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FormGroup, Label } from "reactstrap";
import firebase from "../../Components/Firebase/firebaseSetup";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <article className="themeBgDark">
        <div>
          <ToastContainer />
          <div className="auth-form-outer">
            <h1 className="uppercase">Sign Up</h1>
            <Formik
              initialValues={{ email: "", password: "", name: "", phone: "" }}
              validate={values => {
                const errors = {};
                if(!values.name){
                    errors.name = "user name is required."
                }else if(values.name.length<4){
                    errors.name = "user name must be 4 characters long."
                } 
                if (!values.email) {
                  errors.email = "email address is required.";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "invalid email address.";
                }
                if (!values.password) {
                  errors.password = "password field is empty.";
                } else if (values.password.length < 8) {
                  errors.password = "password must be 8 digit.";
                }
                if (!values.phone){
                  errors.phone = "phone number field is empty.";
                } else if (!/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(values.phone)){
                  errors.phone = "number is invalid, must start with +92";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                      values.email,
                      values.password
                    )
                    .then(user => {
                      if (user) {
                        firebase
                          .auth()
                          .currentUser.updateProfile({
                            displayName: values.name,
                            phoneNumber: values.phone,
                          })
                          .then(s => {
                            firebase
                            .database().ref("UserDetails/").child(values.name).set({ name: values.name, email: values.email , phone: values.phone});
                            this.props.history.push("/home");
                          });
                      }
                    }).catch(error => {
                      console.log(error)
                      toast.error("Email alredy exists!", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                      this.setState({ error: error });
                    });
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormGroup>
                    <Label>Enter User Name</Label>
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
                  <FormGroup>
                    <Label>Enter Email</Label>
                    <div className="txt-field">
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="name@example.com"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Enter Password</Label>
                    <div className="txt-field">
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Enter Phone Number</Label>
                    <div className="txt-field">
                      <Field
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="+923331234567"
                      />
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <div className='flex fspace align-item-center'>
                    <div className='fitem'>
                      <button className='button' type="submit">Sign Up</button>
                    </div>
                    <div className='fitem'>
                      <p className='txt-plus-link'><span>Already have an account? </span> <Link to="/login">Sign In</Link></p>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </article>
    );
  }
}

export default SignUp;
