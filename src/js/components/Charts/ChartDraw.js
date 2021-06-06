import React from 'react'
import { Chart } from "react-google-charts";

const DrawChart = (props) => {
    return (
        <Chart
            chartType="PieChart"
            width="50%"
            height="500px"
            data={props.data}
            options={props.options}
        />
    )
}

export default DrawChart
