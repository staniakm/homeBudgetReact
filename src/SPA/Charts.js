import React from 'react'
import { Chart } from "react-google-charts";



class Charts extends React.Component {

    state = {
        isLoaded: false
    }
    columns =
        [["Task", "Hours per Day"]]
        ;
    charities = [...this.columns];

    componentDidMount() {
        fetch("http://localhost:8080/api/shopping/info")
            .then(response => response.json())
            .then(data => (data.map(obj => Object.values(obj)).map(item => {
                return this.charities.push(item)
            })))
            .then(this.setState({
                data: this.charities,
                isLoaded: true
            }))
    }

    options = {
        title: "My Daily Activities",
        pieHole: 0.3,
        is3D: true
    };

    render() {
        return (
            <div>
                <h1>Charts</h1>
                {this.state.isLoaded &&
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={this.state.data}
                        options={this.options}
                    />}
            </div>
        )
    }
}

export default Charts