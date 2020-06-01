import React, { Component } from "react";
import { Table, Card, CardHeader, CardBody } from "reactstrap";
import uuid from "uuid/v1";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let count = 1;
    const {
      damName,
      dataKeyBar,
      dataKeyLine,
      datakeyArea,
      tableData
    } = this.props;
    return (
      <article className="table-card">
        <Card>
          <CardHeader>{damName}</CardHeader>
          <CardBody>
            <Table>
              <thead className="table-header">
                <tr>
                  <th>No.</th>
                  <th>Period Date</th>
                  <th>{dataKeyBar}</th>
                  <th>{dataKeyLine}</th>
                  <th>{datakeyArea}</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {tableData.map(d => {
                  return (
                    <tr key={uuid()}>
                      <th scope="row">{count++}</th>
                      <td>{d.PeriodDate}</td>
                      <td>{damName==="Mangala Dam" ? d.JehlumatManglaInflow + " acre-foot" : damName==="Tarbela Dam" ? d.IndusatTarbelaInflow +" acre-foot" : damName==="Nowshera Dam" ? d.KabulInflowatNowshera + " acre-foot": ""}</td>
                      <td>{damName==="Mangala Dam" ? d.JehlumatManglaOutflow + " acre-foot" : damName==="Tarbela Dam" ? d.IndusatTarbelaOutflow + " acre-foot" : damName==="Nowshera Dam" ? "": ""}</td>
                      <td>{damName==="Mangala Dam" ? d.JehlumatManglaLevelsfeet + " feet" : damName==="Tarbela Dam" ? d.IndusatTarbelaLevelsfeet + " feet" : damName==="Nowshera Dam" ? "": ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </article>
    );
  }
}

export default Tables;
