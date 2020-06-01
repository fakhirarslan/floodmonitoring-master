import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label } from 'recharts';

class Barchart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, chartMargin, data, data1, color, xlabel, ylabel } = this.props;
    return (
      <article className='out-card'>
        <Card>
          <CardHeader>{title} (acre-foot)</CardHeader>
          <CardBody>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{ top: 15, right: 80, left: 60, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Period Date"  label={{ value:xlabel, angle: 0, position: "insideBottomLeft", dy: 10}}>
                </XAxis>
                <YAxis label={{ value: ylabel, angle: -90, position: 'insideLeft', dx:-40 }} >
                </YAxis>

                <Tooltip />
                <Legend margin="20px"/>
                <Bar dataKey={data1} fill={color} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </article>
    );
  }

}

export default Barchart;

Barchart.defaultProps = {
  title: 'Chart Title', /* title of chart at card-header */
  chartMargin: { top: 10, right: 30, left: 0, bottom: 5 }, /* Change margin of chart inside the card */
}