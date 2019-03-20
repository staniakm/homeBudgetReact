import React from 'react'
import { Chart } from "react-google-charts";



class Charts extends React.Component {

    state = {
        isLoaded: false,
        data:[]
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/shopping/info")
            .then(response => response.json())
            .then(data => (data.map(obj => Object.values(obj))))
            .then(chartData => {
                const data = [["kategoria","suma"]].concat(chartData);
                this.setState({
                    data,
                    isLoaded:true
                })
            })
    }

    render() {
        const {isLoaded, data} = this.state
        const options = {
            title: "Podsumowanie miesiąca",
            pieHole: 0.3,
            is3D: false
        };

        return (
            <div>
                {isLoaded &&
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
}
            </div>
        )
    }
}

export default Charts