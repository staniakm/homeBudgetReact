import React from 'react'
import { Chart } from "react-google-charts";

class Charts extends React.Component {

    state = {
        isLoaded: false,
        data: [],
        previous: []
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/chart/currentMonth")
            .then(response => response.json())
            .then(data => (data.map(obj => Object.values(obj))))
            .then(chartData => {
                const data = [["kategoria", "suma"]].concat(chartData);
                this.setState({
                    data
                })
            })

            fetch("http://localhost:8080/api/chart/previousMonth")
            .then(response => response.json())
            .then(data => (data.map(obj => Object.values(obj))))
            .then(chartData => {
                const previous = [["kategoria", "suma"]].concat(chartData);
                this.setState({
                    previous,
                    isLoaded: true
                })
            })
    }

    render() {
        const { isLoaded, data, previous } = this.state
        const optionsCurrent = {
            title: "Obecny miesiąc",
            pieHole: 0.3,
            is3D: false
        };

        const optionsPrevious = {
            title: "Poprzedni miesiąc",
            pieHole: 0.3,
            is3D: false
        };

        return (
            <div>
                {isLoaded &&
                <div className="rowC">
                    <Chart
                        chartType="PieChart"
                        width="50%"
                        height="500px"
                        data={previous}
                        options={optionsPrevious}
                    />
                    <Chart
                        chartType="PieChart"
                        width="50%"
                        height="500px"
                        data={data}
                        options={optionsCurrent}
                    />
                    </div>
                }
            </div>
        )
    }
}

export default Charts