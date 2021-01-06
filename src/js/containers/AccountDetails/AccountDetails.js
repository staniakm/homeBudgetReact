import React, {Component, Fragment} from 'react'
import {Table} from 'reactstrap'
import axios from 'axios';
import NavigationTab from '../../components/Navigation/NavigationTab'
import * as url from '../../common/ulrs'
import {connect} from 'react-redux'
import {setMonth} from '../../actions';
import {formatCurrency} from '../../common/CurrencyFormat'
import {FaSearch} from "react-icons/fa";

class AccountDetails extends Component {

    state = {
        accounts: [],
        isLoaded: false
    }

    componentDidMount() {
        this.setState({isLoaded: false})
        this.loadData(this.props.month);
    }

    loadData = month => {
        axios.get(url.ACCOUNT + `?month=${month}`)
            .then(response =>
                this.setState({
                    accounts: response.data,
                    isLoaded: true
                })).catch(err => console.log("error ", err))
    }

    showAccountOperations(id) {
        console.log("Check account oprations ", id)
    }

    TableHeader = () => (
        <thead>
        <tr className="oneRow">
            <th scope="col">Nazwa</th>
            <th scope="col">Stan konta (zł)</th>
            <th scope="col">Wydatki {this.props.monthValue} (zł)</th>
            <th scope="col">Przychody {this.props.monthValue} (zł)</th>
            <th scope="col">Operacje</th>
        </tr>
        </thead>
    );

    TableBody = props => (
        <tbody>
        {props.accounts.map(item => (
                <tr className="oneRow" key={item.id}>
                    <td>{item.name}</td>
                    <td>{formatCurrency(item.moneyAmount)}</td>
                    <td>{formatCurrency(item.expense)}</td>
                    <td>{formatCurrency(item.income)}</td>
                    <td className="clickable"><FaSearch onClick={()=> this.showAccountOperations(item.id)}/></td>
                </tr>
            )
        )
        }
        <tr className="oneRow tableSum">
            <td>Suma</td>
            <td>{formatCurrency(props.accounts.reduce((a, {moneyAmount}) => a + moneyAmount, 0))}</td>
            <td>{formatCurrency(props.accounts.reduce((a, {expense}) => a + expense, 0))}</td>
            <td>{formatCurrency(props.accounts.reduce((a, {income}) => a + income, 0))}</td>
            <td>-</td>
        </tr>
        </tbody>
    );

    render() {
        const {accounts, isLoaded} = this.state
        return (
            <Fragment>
                <NavigationTab onclick={this.loadData}/>
                <Table striped>
                    <this.TableHeader/>
                    {isLoaded && <this.TableBody accounts={accounts}/>}
                </Table>
            </Fragment>
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
    setMonth,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
