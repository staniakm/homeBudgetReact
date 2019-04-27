import React, {Component} from 'react'
import {BASE_URL} from '../../Navigation/ulrs'
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
            <th scope="col">Cena minimalna</th>
            <th scope="col">Cena maksymalna</th>
            <th scope="col">Suma rabatu</th>
            <th scope="col">Suma wydana</th>
        </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.id} onClick={() => this.itemDetails(item)}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.minPrice} zł</td>
                    <td>{item.maxPrice} zł</td>
                    <td>{item.totalDiscount} zł</td>
                    <td>{item.totalSpend} zł</td>
                </tr>
            )
        )}
        </tbody>
    );

    itemDetails = (item) =>{
        this.props.history.push(`/item/`+item.itemId)
    }

    componentDidMount(){
        const path =this.props.location.pathname 
        fetch(`${BASE_URL}${path}`)
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