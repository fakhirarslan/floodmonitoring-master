import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class StackBar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, data, data1, data2, data3, color1, color2, color3, xlabel, ylabel } = this.props;
    return (
      <article className='out-card'>
        <Card>
          <CardHeader>{title}</CardHeader>
          <CardBody>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{ top: 15, right: 80, left: 60, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Period Date" label={{ value:xlabel, angle: 0, position: "insideBottomLeft", dy: 10}}/>
                <YAxis  label={{ value: ylabel, angle: -90, position: 'insideLeft', dx:-40 }}/>
                <Tooltip />
                <Legend margin="20px"/>
                <Bar stackId="a" dataKey={data1} fill={color1} />
                <Bar stackId="a" dataKey={data2} fill={color2} />
                <Bar stackId="a" dataKey={data3} fill={color3} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </article>
    );
  }

}

export default StackBar;

StackBar.defaultProps = {
  title: 'Chart Title', /* title of chart at card-header */
  chartMargin: { top: 10, right: 30, left: 0, bottom: 5 }, /* Change margin of chart inside the card */
}