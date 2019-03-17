import React, {Component} from 'react'
import {BASE_URL} from '../../navigation/ulrs'
import {withRouter} from 'react-router'

class ShopItems extends Component {

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

    itemDetails = (item) =>{
        this.props.history.push(`/item/`+item.id)
    }

    componentDidMount(){
        const id = this.props.id
        fetch(`${BASE_URL}shop/${id}/month`)
        .then(response => response.json())
        .then(data => this.setState({
            data: data,
            isLoaded: true
        }))
    }

    render(){
        return (
            <div>
                <h1>Sklep - podsumowanie</h1>
                <table className="invoicesListTable table full-width">
                    <this.TableHeader/>
                    <this.TableBody />
                </table>
            </div>
        )
    }
}

export default withRouter(ShopItems)