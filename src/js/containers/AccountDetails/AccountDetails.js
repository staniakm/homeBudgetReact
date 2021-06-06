import React, {Component, Fragment} from 'react'
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap'
import axios from 'axios';
import NavigationTab from '../../components/Navigation/NavigationTab'
import * as url from '../../common/ulrs'
import {connect} from 'react-redux'
import {setMonth} from '../../actions';
import {formatCurrency} from '../../common/CurrencyFormat'
import {FaEdit, FaSearch} from "react-icons/fa";

class AccountDetails extends Component {

    state = {
        accounts: [],
        isLoaded: false,
        modal: false,
        selectedAccount: {}
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

    editAccount(account) {
        account.newMoneyAmount = account.moneyAmount
        this.setState({
            modal: true,
            selectedAccount: account
        })
    }

    toggleClose = () => {
        this.setState({
            modal: false
        })
    }

    updateValue = (e) => {
        const account = this.state.selectedAccount;
        account.newMoneyAmount = e.target.value;
        this.setState({
            selectedAccount: account,
        })
    }

    toggleSave = () => {
        const account = this.state.selectedAccount;
        if (account.newMoneyAmount !== account.moneyAmount) {
            this.updateCurrentAmount();
        }
        this.setState({
            modal: false,
        })
    }

    updateCurrentAmount = () => {
        console.log("update database")
        let {selectedAccount} = this.state
        axios({
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            url: `${url.ACCOUNT}${selectedAccount.id}`,
            data: JSON.stringify(selectedAccount)
        }).then(response => {
                const accounts = this.state.accounts.map(account => {
                    if (account.id === response.data.id) {
                        account.moneyAmount = response.data.amount
                        return account
                    } else {
                        return account
                    }
                })
                this.setState(
                    {accounts: accounts}
                )
            }
        ).then(() => this.setState({isLoaded: true}));
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
        {props.accounts.map(account => (
                <tr className="oneRow" key={account.id}>
                    <td>{account.name}</td>
                    <td>{formatCurrency(account.moneyAmount)}</td>
                    <td>{formatCurrency(account.expense)}</td>
                    <td>{formatCurrency(account.income)}</td>
                    <td>
                        <span className="clickable"><FaSearch
                            onClick={() => this.showAccountOperations(account.id)}/></span>
                        <span className="clickable"><FaEdit onClick={() => this.editAccount(account)}/></span>
                    </td>
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
            <div>
                <Fragment>
                    <NavigationTab onclick={this.loadData}/>
                    <Table striped>
                        <this.TableHeader/>
                        {isLoaded && <this.TableBody accounts={accounts}/>}
                    </Table>
                </Fragment>
                <Modal isOpen={this.state.modal}>

                    <ModalHeader>{this.state.selectedAccount.name}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="CurrentAmount">Obecny stan</Label>
                            <Input type="number"
                                   name="currentAmount"
                                   id="currentAmount"
                                   value={this.state.selectedAccount.newMoneyAmount}
                                   onChange={this.updateValue}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleSave}>Zapisz</Button>{' '}
                        <Button color="secondary" onClick={this.toggleClose}>Anuluj</Button>
                    </ModalFooter>
                </Modal>
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
    setMonth,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
