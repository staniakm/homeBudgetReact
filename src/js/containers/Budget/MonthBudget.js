import React, {Component} from 'react'
import * as url from '../../common/ulrs'
import {connect} from 'react-redux';
import {setBudget, setMonth} from '../../actions'
import {withRouter} from 'react-router-dom';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import NavigationTab from '../../components/Navigation/NavigationTab'
import MonthBudgetDetails from './MonthBudgetDetails'
import MonthBudgetSummary from './MonthBudgetSummary'

class MonthBudget extends Component {

    state = {
        isLoaded: false,
        date: new Date(),
        modal: false,
        categoryPlanned: "",
        update: false,
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
        }).then(response => {
            const budget = this.props.budgetData
                budget.budgets = budget.budgets.map(item => {
                if (item.category === response.data.budgets[0].category) {
                    return response.data.budgets[0]
                } else {
                    return item
                }
            })
            budget.totalPlanned = response.data.totalPlanned

            this.props.setBudget(
                budget
            )
        }
        ).then(() => this.setState({ isLoaded: true }));
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
            .then(() => this.setState({ isLoaded: true }))
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.isLoaded &&
                        <React.Fragment>
                            <NavigationTab onclick={this.loadData} />
                            <MonthBudgetSummary
                                calculateExpense={this.calculateExpense}
                                budgetData={this.props.budgetData}
                            />
                            <MonthBudgetDetails
                                budgets={this.props.budgetData.budgets}
                                editBudget={this.editBudget}
                            />
                        </React.Fragment>
                    }
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
