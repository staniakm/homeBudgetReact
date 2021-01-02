import React from 'react'
import { Table, Progress } from 'reactstrap'
import {formatCurrency} from '../../common/CurrencyFormat'

const monthBudgetSummary = ({budgetData}) => {
    const calculateExpense = () => {
        if (budgetData.totalEarned === 0) return 0
        return Math.round((budgetData.totalSpend / budgetData.totalEarned) * 100) || 0
    }
    return (
        <Table striped>
            <TableSummaryHeader />
            <TableSummaryBody
                spendMoney={calculateExpense()}
                budgetData={budgetData}
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

const TableSummaryBody = ({budgetData,spendMoney}) => (
    
    <tbody>
        {
            <tr className="oneRow" key={1} >
                <td>{budgetData.date}</td>
                <td>{formatCurrency(budgetData.totalPlanned)}</td>
                <td>{formatCurrency(budgetData.totalSpend)}</td>
                <td>{formatCurrency(budgetData.totalEarned)}</td>
                <td>{formatCurrency(Math.round((budgetData.totalEarned - budgetData.totalSpend) * 100) / 100)}</td>
                <td><Progress color={spendMoney > 100 ? 'danger' : spendMoney > 85 ? "warning" : "success"} value={spendMoney} >{spendMoney} %</Progress></td>
            </tr>
        }
    </tbody>
);

export default monthBudgetSummary
