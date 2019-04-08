import React, {Component} from 'react'
import * as url from '../../navigation/ulrs'
import { connect } from 'react-redux';
import { setMonth } from '../../actions'

class MonthBudget extends Component {

    state = {
        isLoaded: false,
        date: new Date(),
        data: [],

        currentDate: new Date()
    }

    loadData = (value) => {
        fetch(`${url.BUDGET}?month=${value}`)
            .then(response => response.json())
            .then(data => this.setState({
                date: data.date,
                data: data.budgets,
                isLoaded: true
            }))
    }

    TableHeader = () => (
        <thead>
            <tr className="oneRow">
                <th scope="col">Kategoria</th>
                <th scope="col">Wydane</th>
                <th scope="col">Zaplanowane</th>
                <th scope="col">Wykorzystanie planu</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.category} >
                    <td>{item.category}</td>
                    <td>{item.spent} zł</td>
                    <td>{item.planned} zł</td>
                    <td>{item.percentage} %</td>
                </tr>
            )
            )}
        </tbody>
    );

    NavigationTab = () => (
        <div className="rowC">
            <input className="button" type="button" value="poprzedni miesiąc" onClick={() => this.changeMonth(-1)}></input>
            <input className="button" type="button" value="obecny miesiąc" onClick={() => this.changeMonth(0)}></input>
            <input className="button" type="button" value="następny miesiąc" onClick={() => this.changeMonth(1)}></input>
        </div>
    )

    onItemClick = (item) => {
        this.props.history.push(`/invoice/${item.listId}`)
    }

    changeMonth = (value) => {
        const month = (value === 0) ? 0 : this.props.month + value
        this.props.setMonth(month);
        this.loadData(month)
    }

    componentDidMount() {
        this.loadData(this.props.month)
    }

    render(){
        return (
            <div>
                <div>
                    {this.state.isLoaded &&
                <h1>Budżet za {this.state.date}</h1>}
                <this.NavigationTab />
                <table className="invoicesListTable table full-width">
                    <this.TableHeader />
                    <this.TableBody />
                </table>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        month: state.monthReducer.month
    }
};

const mapDispatchToProps = ({
    setMonth: setMonth
});


export default connect(mapStateToProps, mapDispatchToProps)(MonthBudget);