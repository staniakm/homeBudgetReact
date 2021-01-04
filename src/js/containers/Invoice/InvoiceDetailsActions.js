import React from 'react'
import {Table} from 'reactstrap';
import {formatCurrency} from '../../common/CurrencyFormat'
import {FaList} from "react-icons/fa";

const TableHeader = () => (
    <thead>
    <tr className="tableHeaderColumn">
        <th scope="col">Nazwa</th>
        <th scope="col">Ilość</th>
        <th scope="col">Cena jednostkowa</th>
        <th scope="col">Rabat</th>
        <th scope="col">Suma</th>
        <th scope="col">Historia</th>
    </tr>
    </thead>
);

const TableBody = ({data, onItemClick}) => (
    <tbody>
    {data && data.map(item => (
            <tr className="oneRow" key={item.invoiceItemId}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{formatCurrency(item.discount)}</td>
                <td>{formatCurrency(item.totalPrice)}</td>
                <td><FaList className="clickable" onClick={() => onItemClick(item)}/></td>
            </tr>
        )
    )}
    </tbody>
);

const IDTable = (props) => {
    return (
        <Table striped>
            <TableHeader/>
            <TableBody data={props.data} onItemClick={props.onClick}/>
        </Table>
    )
}

export default IDTable
