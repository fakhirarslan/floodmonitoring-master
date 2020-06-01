import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { WeatherCard } from './weatherCard';

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='theme-container'>
        <h2>Dam's Weather Report</h2>
        <Row>
          <Col lg={3}>
            <WeatherCard 
              damName='Nowshera Dam'
              currentLat="34.0105"
              currentLong="71.9876"
            />
          </Col>
          <Col lg={3}>
            <WeatherCard 
              damName='Hub Dam'
              currentLat="25.2442"
              currentLong="67.1128"
            />
          </Col>
          <Col lg={3}>
            <WeatherCard 
              damName='Kalabagh Dam'
              currentLat="33.1406"
              currentLong="72.9564"
            />
          </Col>
          <Col lg={3}>
            <WeatherCard 
              damName='Mangala Dam'
              currentLat="33.1406"
              currentLong="73.6426"
            />
          </Col>
          <Col lg={3}>
            <WeatherCard 
              damName='Mirani Dam'
              currentLat="25.9424"
              currentLong="62.6932"
            />
          </Col>
          <Col lg={3}>
            <WeatherCard 
              damName='Rawal Dam'
              currentLat="33.7027"
              currentLong="73.1261"
            />
          </Col>
          <Col lg={3}>
            <WeatherCard 
              damName='Tarbela Dam'
              currentLat="34.0875"
              currentLong="72.699"
            />
          </Col>
          <Col lg={3}>
            <WeatherCard 
              damName='Warsak Dam'
              currentLat="34.164"
              currentLong="71.3585"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Weather;
