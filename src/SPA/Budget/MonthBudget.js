import React, { Component } from 'react'
import * as url from '../../Navigation/ulrs'
import { connect } from 'react-redux';
import { setMonth } from '../../Action'
import { Table, Button } from 'reactstrap';

class MonthBudget extends Component {

    state = {
        isLoaded: false,
        date: new Date(),
        data: [],

        currentDate: new Date()
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
            <Button outline color="success" onClick={() => this.changeMonth(-1)}>Poprzedni miesiąc</Button>
            <Button outline color="success" onClick={() => this.changeMonth(0)}>Obecny miesiąc</Button>
            <Button outline color="success" onClick={() => this.changeMonth(1)}>Następny miesiąc</Button>
        </div>
    )

    changeMonth = (value) => {
        const month = (value === 0) ? 0 : this.props.month + value
        this.props.setMonth(month);
        this.loadData(month)
    }

    componentDidMount() {
        this.loadData(this.props.month)
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

    render() {
        return (
            <div>
                <div>
                    {this.state.isLoaded &&
                        <h2>Budżet za {this.state.date}</h2>}
                    <this.NavigationTab />
                    <Table striped>
                        <this.TableHeader />
                        <this.TableBody />
                    </Table>
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