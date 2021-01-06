import React, { Component } from 'react'
import * as url from '../../common/ulrs'
import { connect } from 'react-redux';
import { setMonth } from '../../actions'
import { Table } from 'reactstrap';
import NavigationTab from '../../components/Navigation/NavigationTab'
import {formatCurrency} from '../../common/CurrencyFormat'
import {FaSearch} from 'react-icons/fa';



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
                <th scope="col">Data {this.props.monthValue}</th>
                <th scope="col">Suma</th>
                <th scope="col">Konto</th>
                <th scope="col">Pozycje</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.listId} >
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{item.account}</td>
                    <td><FaSearch className="clickable" onClick={() => this.onItemClick(item)}/></td>
                </tr>
            )
            )}
        </tbody>
    );

    onItemClick = (item) => {
        // window.location.assign(`/invoice/${item.listId}`)
        this.props.history.push(`/invoice/${item.listId}`)
    }

    componentDidMount() {
        this.loadData(this.props.month)
    }

    render() {
        return (
            <div>
                <NavigationTab onclick={this.loadData}/>
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
        month: state.monthReducer.month,
        monthValue: state.monthReducer.monthValue,
    }
};

const mapDispatchToProps = ({
    setMonth: setMonth
});


export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
