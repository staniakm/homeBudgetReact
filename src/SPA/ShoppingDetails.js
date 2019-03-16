import React, { Component } from 'react'
import {BASE_URL} from '../navigation/ulrs'

class ShoppingDetails extends Component {
    state = {
        isLoaded: false,
        shoppingDetails: []
    }

    TableHeader = () => (
        <thead>
        <tr>
            <th scope="col">Nazwa</th>
            <th scope="col">Ilość</th>
            <th scope="col">Cena</th>
            <th scope="col">Cena jednostkowa</th>
            <th scope="col">Opis</th>
        </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.shoppingDetails.map(item => (
                <tr className="oneRow" key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.description}</td>
                </tr>
            )
        )}
        </tbody>
    );

    componentDidMount() {
        fetch(BASE_URL + "shopping/" + this.props.id)
            .then(response => response.json())
            .then(data => this.setState({
                shoppingDetails: data,
                isLoaded: true
            }))
    };


    
    render() {
        return (
            <div>
                <h1>Szczegóły paragonów</h1>
                <table className="invoicesListTable table full-width">
                 <this.TableHeader/>
                 <this.TableBody />
                </table>

            </div>
        )
    }

}

export default ShoppingDetails