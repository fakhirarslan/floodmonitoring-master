import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Areachart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, chartMargin, data, data1, color, xlabel, ylabel } = this.props;
    return (
      <article className='out-card'>
        <Card>
          <CardHeader>{title} (feet)</CardHeader>
          <CardBody>
            <ResponsiveContainer>
              <AreaChart
              data={data}
              margin={{ top: 15, right: 80, left: 60, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Period Date" label={{ value:xlabel, angle: 0, position: "insideBottomLeft", dy: 7}}> 
              </XAxis>
              <YAxis label={{ value: ylabel, angle: -90, position: 'insideLeft', dx:-40 }}/>
              <Tooltip />
              <Area type="monotone" dataKey={data1} stroke="#8884d8" fill={color} />
            </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </article>
    );
  }

}

export default Areachart;

Areachart.defaultProps = {
  title: 'Chart Title', /* title of chart at card-header */
  chartMargin: { top: 10, right: 30, left: 0, bottom: 5 }, /* Change margin of chart inside the card */
}