import React, { Component } from 'react'
import * as url from '../../Navigation/ulrs'
import { connect } from 'react-redux';
import { setMonth, setBudget } from '../../Action'
import { withRouter } from 'react-router-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Progress } from 'reactstrap';
import axios from 'axios';
class MonthBudget extends Component {

    state = {
        isLoaded: false,
        date: new Date(),
        modal: false,
        categoryPlanned: "",
        update: false,
    }

    TableHeader = () => (
        <thead>
            <tr className="oneRow">
                <th scope="col">Kategoria</th>
                <th scope="col">Wydane</th>
                <th scope="col">Zaplanowane</th>
                <th scope="col">Wykorzystanie planu</th>
                <th scope="col">Operacja</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.props.budgetData.budgets.map(item => (
                <tr className="oneRow" key={item.category} >
                    <td>{item.category}</td>
                    <td>{item.spent} zł</td>
                    <td>{item.planned} zł</td>
                    <td><Progress color={item.percentage > 100 ? 'danger' : item.percentage > 85 ? "warning" : "success"} value={item.percentage} >{item.percentage} %</Progress></td>
                    <td><Button outline color="success" onClick={() => this.editBudget(item)}>Edytuj</Button></td>
                </tr>
            )
            )}
        </tbody>
    );

    TableSummaryHeader = () => (
        <thead>
            <tr className="oneRow">
                <th scope="col">Budżet</th>
                <th scope="col">Zaplanowane</th>
                <th scope="col">Wydane</th>
                <th scope="col">Przychód</th>
                <th scope="col">Oszczędności</th>
                <th>% wydanych pieniędzy</th>
            </tr>
        </thead>
    );

    TableSummaryBody = () => (
        <tbody>
            {this.props.budgetData &&
                <tr className="oneRow" key={1} >
                    <td>{this.props.budgetData.date}</td>
                    <td>{this.props.budgetData.totalPlanned} zł</td>
                    <td>{this.props.budgetData.totalSpend} zł</td>
                    <td>{this.props.budgetData.totalEarned} zł</td>
                    <td>{Math.round((this.props.budgetData.totalEarned - this.props.budgetData.totalSpend) * 100) / 100} zł</td>
                    <td><Progress color={this.calculateExpense() > 100 ? 'danger' : this.calculateExpense() > 85 ? "warning" : "success"} value={this.calculateExpense()} >{this.calculateExpense()} %</Progress></td>
                </tr>
            }
        </tbody>
    );

    calculateExpense() {
        return Math.round((this.props.budgetData.totalSpend / this.props.budgetData.totalEarned) * 100)
    }

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

    editBudget = (category) => {
        this.setState({
            modal: true,
            categoryPlanned: category
        })
    }

    toggleClose = () => {
        this.setState({
            modal: false
        })
    }

    updatePlannedValue = () => {
        let { categoryPlanned } = this.state
        axios({
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            url: `${url.BUDGET}?month=${this.props.month}`,
            data: JSON.stringify(categoryPlanned)
        }).then(response => //this.props.setBudget(response.data)
        {
            const budget = this.props.budgetData
            const list = budget.budgets.map(item => {
                if (item.category === response.data.budgets[0].category) {
                    return response.data.budgets[0]
                } else {
                    return item
                }
            });
            budget.budgets = list
            budget.totalPlanned = response.data.totalPlanned

            this.props.setBudget(
                budget
            )
        }
        ).then(d => this.setState({ isLoaded: true }));
    }

    toggleSave = () => {
        this.updatePlannedValue();
        this.setState({
            modal: false,
            update: false
        })
    }

    updateValue = (e) => {
        var category = this.state.categoryPlanned;
        category.planned = e.target.value;
        this.setState({
            categoryPlanned: category,
            update: true
        })
    }

    loadData = (value) => {
        axios.get(`${url.BUDGET}?month=${value}`)
            .then(response => this.props.setBudget(response.data))
            .then(date => this.setState({ isLoaded: true }))
    }

    render() {
        return (
            <div>
                <div>
                    <Table striped>
                        <this.TableSummaryHeader />
                        <this.TableSummaryBody />
                    </Table>
                    <this.NavigationTab />
                    <Table striped>
                        <this.TableHeader />
                        <this.TableBody />
                    </Table>
                </div>

                <Modal isOpen={this.state.modal} >

                    <ModalHeader>{this.state.categoryPlanned.category}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="Planned">Zaplanowano</Label>
                            <Input type="number"
                                name="planned"
                                id="Planned"
                                value={this.state.categoryPlanned.planned}
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
        budgetData: state.budgetReducer.budgetData
    }
};

const mapDispatchToProps = ({
    setMonth,
    setBudget
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonthBudget));