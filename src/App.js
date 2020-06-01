import React, { Component } from "react";
import Landing from "./Views/Landing/landing";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Details from "./Views/DetailedInfo/charts";
import SignUp from "./Views/Auth/signup";
import Login from "./Views/Auth/login";
import firebase from "./Components/Firebase/firebaseSetup";
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "./Views/AdminPanel/admin";
import EditProfile from "./Views/Profile/edit";
import Weather from "./Views/Weather/Weather";
import Predictions from "./Views/Predictions/Predictions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      mapType: "MapLayer"
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticated => {
      (authenticated || localStorage.getItem('auth')) ? this.setState({ authenticated: true }) : this.setState({ authenticated: false });
    });
  }

  getMapView = (mapType) => {
    this.setState({ mapType })
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <ProtectedRoute authenticated={authenticated} getMapView={this.getMapView} mapType={this.state.mapType} path="/home" component={Landing} />
            <ProtectedRoute authenticated={authenticated} getMapView={this.getMapView} mapType={this.state.mapType} path="/admin" component={AdminPanel} />
            <ProtectedRoute
              authenticated={authenticated}
              path="/charts/:name"
              component={Details}
            />
            <ProtectedRoute
              authenticated={authenticated}
              path="/predictions"
              component={Predictions}
            />
            <ProtectedRoute authenticated={authenticated} path="/edit/:name" component={EditProfile} />
            <ProtectedRoute authenticated={authenticated} path="/weather" component={Weather} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
