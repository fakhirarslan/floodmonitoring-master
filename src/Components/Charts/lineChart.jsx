import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Linechart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { data, data1, color } = this.props;
    return (
      <article className='out-card predictions'>
        <Card>
          <CardHeader>{"Predictions"}</CardHeader>
          <CardBody>
            <ResponsiveContainer>
              <LineChart
              data={data}
              height="300"
              margin={{ top: 15, right: 80, left: 60, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Period Date" label={{ value:"Period Date", angle: 0, position: "insideBottomLeft", dy: 7}}/>
              <YAxis domain={[0, dataMax => (Math.round(50 * 1.2))]} label={{ value: "Capacity", angle: -90, position: 'insideLeft', dx:-40 }}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={data1} stroke={color} activeDot={{ r: 8 }} strokeWidth="3"  />
            </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </article>
    );
  }

}

export default Linechart;

Linechart.defaultProps = {
  title: 'Chart Title', /* title of chart at card-header */
  chartMargin: { top: 10, right: 30, left: 0, bottom: 5 }, /* Change margin of chart inside the card */
}