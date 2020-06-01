import React, { Component } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FormGroup, Label } from "reactstrap";
import firebase from "../../Components/Firebase/firebaseSetup";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: null,
      authenticated: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticated => {
      authenticated ? this.setState({ authenticated: true }) : this.setState({ authenticated: false });
    });
  }

  render() {
    return (
      <article className="themeBgDark">
        <div>
          <ToastContainer />
          <div className="auth-form-outer">
            <h1 className="uppercase">Sign in</h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={values => {
                const errors = {};
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
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(values.email, values.password)
                    .then(user => {
                      if(user.user.email==="admin@admin.com"){
                        this.props.history.push('/admin');
                      }else{
                        if( this.state.authenticated === true ){
                          localStorage.setItem('auth', true)
                        }
                        this.props.history.push("/home"); 
                      }
                    })
                    .catch(error => {
                      toast.error("Email does not exists!", {
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
                  <div className='flex fspace align-item-center'>
                    <div className='fitem'>
                      <button className='button' type="submit">Sign In</button>
                    </div>
                    <div className='fitem'>
                      <p className='txt-plus-link'><span>Don't have an account? </span> <Link to="/signup">Sign Up</Link></p>
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

export default Login;
