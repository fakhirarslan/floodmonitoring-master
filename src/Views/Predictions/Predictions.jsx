import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import firebase from '../../Components/Firebase/firebaseSetup';
import Linechart from '../../Components/Charts/lineChart';

class Predictions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      damName: this.props.location ? this.props.location.pathname.slice(8, this.props.location.pathname.length): "Tarbela Dam"
    }
  }

  componentDidMount() {
    let th = this;
    firebase.database().ref("2017to2019-Riverflows/").once("value", function(snapshot) {
      th.setState({ data: Object.values(snapshot.val())[0].slice(450,460)});
    })
  }



  render() {
    const { damName, weekly, montly, yearly } = this.state;
    const dataKeyBar = damName==="Mangala Dam" ? "Jehlum at Mangla Inflow" : damName==="Tarbela Dam" ? "Indus at Tarbela Inflow" : damName==="Nowshera Dam" ? "Kabul Inflow at Nowshera": damName==="Head Marala" ? "Chenab Inflow at Marala": ""
    return (
      <article className='board'>
        <h2 className='uppercase'>{"Predictions"}</h2>
        <hr />
        <div className='chart-filter'>
          <button onClick={() => this.getData("weekly")} className={weekly ? 'button active' : "button"}>Tarbela</button>
          <button onClick={() => this.getData("monthly")} className={montly ? 'button active' : "button"}>Mangala</button>
          <button onClick={() => this.getData("yearly")} className={yearly ? 'button active' : "button"}>Yearly</button>
        </div>
        <hr />
        <Row>
          <Col sm={6} lg={6}>
            <Linechart data={this.state.data} data1={dataKeyBar}/>
          </Col>
          <Col sm={6} lg={6}>
            <Linechart data={this.state.data} data1={dataKeyBar}/>
          </Col>
        </Row>
        <div className='space-2p5rem'></div>
      </article>
    );
  }

}

export default Predictions;