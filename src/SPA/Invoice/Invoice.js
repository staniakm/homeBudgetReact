import React, { Component } from 'react'
import * as url from '../../Navigation/ulrs'
import { connect } from 'react-redux';
import { setMonth } from '../../Action'
import { Table, Button } from 'reactstrap';

class Invoice extends Component {
    state = {
        isLoaded: false,
        data: []
    }

    loadData = (value) => {
        fetch(`${url.INVOICE}?month=${value}`)
            .then(response => response.json())
            .then(data => this.setState({
                data,
                isLoaded: true
            }))
    }

    TableHeader = () => (
        <thead>
            <tr className="tableHeaderColumn oneRow">
                <th scope="col">Sklep</th>
                <th scope="col">Data</th>
                <th scope="col">Cena</th>
                <th scope="col">Konto</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow clickable" key={item.listId} onClick={() => this.onItemClick(item)}>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.price} zł</td>
                    <td>{item.account}</td>
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

    render() {
        return (
            <div>
                <this.NavigationTab />
                <Table striped>
                    <this.TableHeader />
                    <this.TableBody />
                </Table>
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


export default connect(mapStateToProps, mapDispatchToProps)(Invoice);