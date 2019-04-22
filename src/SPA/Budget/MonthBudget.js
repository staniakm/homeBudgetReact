import React, { Component } from 'react'
import * as url from '../../Navigation/ulrs'
import { connect } from 'react-redux';
import { setMonth } from '../../Action'
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import axios from 'axios';
class MonthBudget extends Component {

    state = {
        isLoaded: false,
        date: new Date(),
        data: [],
        spend: "",
        planned: "",
        earned: "",
        modal: false,
        categoryPlanned: "",
        update: false
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
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.category} >
                    <td>{item.category}</td>
                    <td>{item.spent} zł</td>
                    <td>{item.planned} zł</td>
                    <td style={{ color: item.percentage > 100 ? 'red' : item.percentage > 85 ? "orange" : "green" }}>{item.percentage} %</td>
                    <td><Button outline color="success" onClick={() => this.editBudget(item)}>Edytuj</Button></td>
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

    editBudget = (category) => {
        // this.props.history.push(`budget/edit?${category}`)
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
        // const monthBudget = {
        //     category: categoryPlanned.category,
        //     planned: categoryPlanned.planned
        // }
        axios.post(`${url.BUDGET}?month=${this.props.month}`,
            {
                category: categoryPlanned.category,
                planned: categoryPlanned.planned
            })
            .then(response => this.setState({
                date: response.data.date,
                planned: response.data.totalPlanned,
                spend: response.data.totalSpend,
                earned: response.data.totalEarned,
                data: response.data.budgets,
                isLoaded: true
            }));
    }

    toggleSave = () => {
        this.updatePlannedValue();
        this.setState({
            modal: false,
            update: false
        })
    }

    updateValue = (e) => {
        var cat = this.state.categoryPlanned;
        cat.planned = e.target.value;
        this.setState({
            categoryPlanned: cat,
            update: true
        })
    }

    loadData = (value) => {
        axios.get(`${url.BUDGET}?month=${value}`)
            .then(response => this.setState({
                date: response.data.date,
                planned: response.data.totalPlanned,
                spend: response.data.totalSpend,
                earned: response.data.totalEarned,
                data: response.data.budgets,
                isLoaded: true
            }))
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.isLoaded &&
                        <div>
                            <h2>Budżet za {this.state.date}</h2>
                            <p>Zaplanowane: {this.state.planned} zł</p>
                            <p>Wydatki: {this.state.spend} zł</p>
                            <p>Przychód: {this.state.earned} zł</p>
                        </div>}
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
        month: state.monthReducer.month
    }
};

const mapDispatchToProps = ({
    setMonth: setMonth
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonthBudget));