import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 0 },
  { month: 'Mar', revenue: 0 },
  { month: 'Apr', revenue: 0 },
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 20 },
  { month: 'Jul', revenue: 120 },
  { month: 'Aug', revenue: 50 },
  { month: 'Sep', revenue: null },
  { month: 'Oct', revenue: null },
  { month: 'Nov', revenue: null },
  { month: 'Dec', revenue: null },
];

const RevenueChart = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;