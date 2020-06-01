import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Barchart from '../../Components/Charts/barChart';
import Linechart from '../../Components/Charts/lineChart';
import Areachart from '../../Components/Charts/areaChart';
import firebase from '../../Components/Firebase/firebaseSetup';
import StackBar from '../../Components/Charts/StackBar';
import Tables from './Tables';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      damName: this.props.location.pathname.slice(8, this.props.location.pathname.length),
      weekly : true,
      montly: false,
      yearly: false
    }
  }

  componentDidMount() {
    let th = this;
    firebase.database().ref("2017to2019-Riverflows/").once("value", function(snapshot) {
      th.setState({ data: Object.values(snapshot.val())[0].slice(450,460)});
    })
  }


  getData = (period) => {
    let th = this;
    if(period==="weekly"){
    firebase.database().ref("2017to2019-Riverflows/").once("value", function(snapshot) {
      th.setState({ data: Object.values(snapshot.val())[0].slice(450,460), weekly: true, montly: false, yearly: false });
    })
    }
    if(period==="monthly"){
      firebase.database().ref("2017to2019-Riverflows/").once("value", function(snapshot) {
        th.setState({ data: Object.values(snapshot.val())[0].slice(400,460), weekly: false, montly: true, yearly: false });
      })
    }
    if(period==="yearly"){
      firebase.database().ref("2017to2019-Riverflows/").once("value", function(snapshot) {
        th.setState({ data: Object.values(snapshot.val())[0].slice(300,400), weekly: false, montly: false, yearly: true });
      })
    }
}

  render() {
    const { data, weekly, montly, yearly, damName } = this.state;
    let tableData = JSON.parse(JSON.stringify(data).replace(/\s/g, ''));
    tableData = JSON.parse(JSON.stringify(tableData).replace(/[()]/g, ''));
    const dataKeyBar = damName==="Mangala Dam" ? "Jehlum at Mangla Inflow" : damName==="Tarbela Dam" ? "Indus at Tarbela Inflow" : damName==="Nowshera Dam" ? "Kabul Inflow at Nowshera": damName==="Head Marala" ? "Chenab Inflow at Marala": ""
    const dataKeyLine = damName==="Mangala Dam" ? "Jehlum at Mangla Outflow" : damName==="Tarbela Dam" ? "Indus at Tarbela Outflow" : damName==="Head Marala" ? "Chenab Outflow at Marala" :""
    const datakeyArea = damName==="Mangala Dam" ? "Jehlum at Mangla Levels(feet)" : damName==="Tarbela Dam" ? "Indus at Tarbela Levels(feet)" : damName==="Head Marala" ? "Chenab at Marala Levels(Feet)" : ""

    return (
      <article className='board'>
        <h2 className='uppercase'>{damName}</h2>
        <hr />
        <div className='chart-filter'>
          <button onClick={() => this.getData("weekly")} className={weekly ? 'button active' : "button"}>Weekly</button>
          <button onClick={() => this.getData("monthly")} className={montly ? 'button active' : "button"}>Monthly</button>
          <button onClick={() => this.getData("yearly")} className={yearly ? 'button active' : "button"}>Yearly</button>
        </div>
        <hr />
        <Row>
          <Col sm={6} lg={6}>
            <Barchart xlabel="Period Time"  ylabel="Inflows"  title={damName +" Inflows"} data={data} data1={dataKeyBar} color="#F1C40F"/>
          </Col>
          <Col sm={6} lg={6}>
            <Barchart xlabel="Period Time"  ylabel="Outflows" title={damName +" Outflows"} data={data} data1={dataKeyLine} color="#c0392b"/>
          </Col>
        </Row>
        <Row>
          <Col sm={6} lg={6}>
            <Areachart xlabel="Period Time"  ylabel="Levels"  title={damName +" Levels"} data={data} data1={datakeyArea} color="#2ecc71"/>
          </Col>
          <Col sm={6} lg={6}>
            <StackBar xlabel="Period Time"  ylabel="Trends" title={damName +" Current Year Trends"} data={data} data1="System Inflows Current Year" data2="System Inflows Last Year" data3="System Inflows This Decade" color1="#2980B9" color2="#34495E" color3="#E74C3C" />
          </Col>
        </Row>
        <Row>
            <Col sm={12} lg={12}>
              <Tables damName={damName} tableData={tableData} dataKeyBar={dataKeyBar} dataKeyLine={dataKeyLine} datakeyArea={datakeyArea} />
            </Col>
        </Row>
        <div className='space-2p5rem'></div>
      </article>
    );
  }

}

export default Details;