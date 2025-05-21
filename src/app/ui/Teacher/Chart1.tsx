"use client"

import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Page A', uv: 7 },
  { name: 'Page B', uv: 4 },
  { name: 'Page C', uv: 10 },
  { name: 'Page D', uv: 5 },
  { name: 'Page E', uv: 2 },
  { name: 'Page F', uv: 9 },
  { name: 'Page G', uv: 2 },
];

export default  function Example(){
  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <BarChart width={300} height={200} data={data}>
        <XAxis
          dataKey="name"
          tick={{
            fill: "rgb(94, 105, 202)",
            fontFamily: "Michroma",
            fontSize: 10
          }}
        />
        <Tooltip
          contentStyle={{
            fontFamily: "Michroma",
            fontSize: "12px"
          }}
          labelStyle={{
            color: "rgb(94, 105, 202)",
            fontFamily: "Michroma",
            fontSize: "10px"
          }}
        />
        <Bar
          dataKey="uv"
          fill="rgb(136,138,255)"
          background={{ fill: 'rgba(136, 138, 255, 0.14)' }}
          activeBar={<Rectangle fill="rgb(252, 251, 251)" stroke="#555" />}
        />
      </BarChart>
    </div>
  );
}
