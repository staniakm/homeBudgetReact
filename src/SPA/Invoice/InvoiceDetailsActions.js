import React from 'react'

const TableHeader = () => (
    <thead>
        <tr className="oneRow">
            <th scope="col">Nazwa</th>
            <th scope="col">Ilość</th>
            <th scope="col">Cena jednostkowa</th>
            <th scope="col">Cena</th>
            <th scope="col">Opis</th>
        </tr>
    </thead>
);

const TableBody = ({data, onItemClick}) => (
    <tbody>
        {data && data.map(item => (
            <tr className="oneRow" key={item.id} onClick={() => onItemClick(item)}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice} zł</td>
                <td>{item.price} zł</td>
                <td>{item.description}</td>
            </tr>
        )
        )}
    </tbody>
);

const IDTable = (props) => {
    return (
        <table className="invoicesListTable table full-width">
            <TableHeader/>
            <TableBody data={props.data} onItemClick={props.onClick}/>
        </table>
    )
}

export default IDTable