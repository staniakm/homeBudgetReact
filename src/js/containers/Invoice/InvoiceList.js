import React from 'react'
import {Table} from 'reactstrap'
import {formatCurrency} from "../../common/CurrencyFormat";
import {FaSearch} from "react-icons/fa";
import {useHistory} from "react-router-dom";

export const InvoiceList = ({data, month}) => {
    let history = useHistory();

    function onItemClick(itemId) {
        history.push(`/invoice/${itemId}`)
    }

    function TableBody({data}) {
        return <tbody>
        {data && data.map(item => (
                <tr className="oneRow" key={item.listId}>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{item.account}</td>
                    <td><FaSearch className="clickable" onClick={() => onItemClick(item.listId)}/></td>
                </tr>
            )
        )}
        </tbody>
    }

    return (
        <div>
            <Table striped>
                <TableHeader month={month}/>
                <TableBody data={data}/>
            </Table>
        </div>
    )
}


const TableHeader = ({month}) => (
    <thead>
    <tr className="tableHeaderColumn oneRow">
        <th scope="col">Sklep</th>
        <th scope="col">Data {month}</th>
        <th scope="col">Suma</th>
        <th scope="col">Konto</th>
        <th scope="col">Pozycje</th>
    </tr>
    </thead>
);
