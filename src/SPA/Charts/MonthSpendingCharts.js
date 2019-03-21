import React from 'react'
import DrawChart from './ChartDraw'

class MonthSpendingChart extends React.Component {
    month = {
        prevoius: "http://localhost:8080/api/chart/previousMonth",
        next: "http://localhost:8080/api/chart/currentMonth"
    }
    state = {
        isLoaded: false,
        data: [],
        previous: []
    }

    getApiData = async (ulr) => {
        const response = await fetch(ulr);
        const data = await response.json();
        return (data.map(obj => Object.values(obj)));
    }

    componentDidMount() {
        this.getApiData(this.month.next)
            .then(chartData => {
                const data = [["kategoria", "suma"]].concat(chartData);
                this.setState({
                    data
                })
            })

        this.getApiData(this.month.prevoius)
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
                        <DrawChart options={optionsPrevious} data={previous} />
                        <DrawChart options={optionsCurrent} data={data} />
                    </div>
                }
            </div>
        )
    }
}

export default MonthSpendingChart