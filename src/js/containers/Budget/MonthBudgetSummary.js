import React from 'react'
import { Table, Progress } from 'reactstrap'

const monthBudgetSummary = props => {
    const calculateExpense = () => {
        if (props.budgetData.totalEarned === 0) return 0
        return Math.round((props.budgetData.totalSpend / props.budgetData.totalEarned) * 100) || 0
    }
    return (
        <Table striped>
            <TableSummaryHeader />
            <TableSummaryBody
                spendMoney={calculateExpense()}
                budgetData={props.budgetData}
            />
        </Table>
    )
}

const TableSummaryHeader = () => (
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

const TableSummaryBody = props => (
    
    <tbody>
        {
            <tr className="oneRow" key={1} >
                <td>{props.budgetData.date}</td>
                <td>{props.budgetData.totalPlanned} zł</td>
                <td>{props.budgetData.totalSpend} zł</td>
                <td>{props.budgetData.totalEarned} zł</td>
                <td>{Math.round((props.budgetData.totalEarned - props.budgetData.totalSpend) * 100) / 100} zł</td>
                <td><Progress color={props.spendMoney > 100 ? 'danger' : props.spendMoney > 85 ? "warning" : "success"} value={props.spendMoney} >{props.spendMoney} %</Progress></td>
            </tr>
        }
    </tbody>
);

export default monthBudgetSummary