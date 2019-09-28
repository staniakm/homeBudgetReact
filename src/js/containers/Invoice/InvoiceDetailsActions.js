import React from 'react'
import { Table } from 'reactstrap';

const TableHeader = () => (
    <thead>
        <tr className="tableHeaderColumn">
            <th scope="col">Nazwa</th>
            <th scope="col">Ilość</th>
            <th scope="col">Cena jednostkowa</th>
            <th scope="col">Rabat</th>
            <th scope="col">Suma</th>
        </tr>
    </thead>
);

const TableBody = ({data, onItemClick}) => (
    <tbody>
        {data && data.map(item => (
            <tr className="oneRow clickable" key={item.itemId} onClick={() => onItemClick(item)}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.price} zł</td>
                <td>{item.discount} zł</td>
                <td>{item.totalPrice}</td>
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