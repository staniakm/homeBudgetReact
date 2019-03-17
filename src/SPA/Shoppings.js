import React, {Component} from 'react'
import {BASE_URL} from '../navigation/ulrs'

class Shoppings extends Component {
    state = {
        isLoaded:false,
        shoppingList:[]
    }

    TableHeader = () => (
        <thead>
        <tr className="oneRow">
            <th scope="col">Sklep</th>
            <th scope="col">Data</th>
            <th scope="col">Cena</th>
        </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.shoppingList.map(item => (
                <tr className="oneRow" key={item.id} onClick={() => this.onItemClick(item)}>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.price} zł</td>
                </tr>
            )
        )}
        </tbody>
    );


    onItemClick = (item) => {
        this.props.history.push(`/shopping/`+ item.id)
    }

    componentDidMount() {
        fetch(BASE_URL+"shopping")
        .then(response => response.json())
        .then(data => this.setState({
            shoppingList: data ,
            isLoaded:true
        }))
    }
    render () {
    return (
        <div>
            <h1>Paragony</h1>
            <table className="invoicesListTable table full-width">
                 <this.TableHeader/>
                 <this.TableBody />
                </table>
        </div>
    )
    }
}

export default Shoppings;