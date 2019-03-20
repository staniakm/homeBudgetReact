import React, { Component } from 'react'
import {BASE_URL} from '../navigation/ulrs'
import {withRouter} from 'react-router'

class ShoppingDetails extends Component {
    state = {
        isLoaded: false,
        data: []
    }

    TableHeader = () => (
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

    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.id} onClick={() => this.itemDetails(item)}>
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

    componentDidMount() {
        fetch(`${BASE_URL}shopping/${this.props.id}`)
            .then(response => response.json())
            .then(data => this.setState({
                data,
                isLoaded: true
            }))
    };

    itemDetails = (item) =>{
        this.props.history.push(`/item/`+item.id)
    }

    
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

export default withRouter( ShoppingDetails)