import React from 'react'
import { Table, Progress, Button } from 'reactstrap'
import {formatCurrency} from '../../common/CurrencyFormat'


const monthBudgetDetails = props => {

    return (
        <Table striped>
            <TableHeader />
            <TableBody budgets = {props.budgets} editBudget={props.editBudget}/>
        </Table>
    )
};

const TableHeader = () => {
    return <thead>
        <tr className="oneRow">
            <th scope="col">Kategoria</th>
            <th scope="col">Wydane</th>
            <th scope="col">Zaplanowane</th>
            <th scope="col">Wykorzystanie planu</th>
            <th scope="col">Operacja</th>
        </tr>
    </thead>
};

const TableBody = (props) => (
    <tbody>
        {props.budgets.map(item => (
            <tr className="oneRow" key={item.category} >
                <td>{item.category}</td>
                <td>{formatCurrency(item.spent)}</td>
                <td>{formatCurrency(item.planned)}</td>
                <td><Progress color={item.percentage > 100 ? 'danger' : item.percentage > 85 ? "warning" : "success"} value={item.percentage} >{item.percentage} %</Progress></td>
                <td><Button outline color="success" onClick={() => props.editBudget(item)}>Edytuj</Button></td>
            </tr>
        )
        )}
    </tbody>
);


export default monthBudgetDetails;
