import React, { Component } from 'react'
import { BASE_URL } from '../../navigation/ulrs'

class Shop extends Component {

    state = {
        isLoaded: false,
        data: []
    }

    TableHeader = () => (
        <thead>
        <tr className="oneRow">
            <th scope="col">Nazwa</th>
        </tr>
        </thead>
    );
    
    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.shopId} onClick={() => this.onShopClick(item)}>
                    <td>{item.name}</td>
                </tr>
            )
        )}
        </tbody>
    );

    onShopClick = (shop) => {
        console.log(shop)
    }

    componentDidMount() {
        fetch(BASE_URL + "shop")
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
                isLoaded: true
            }))
    }

    render() {
        return (
            <div>
                <h1>Sklepy</h1>
                <table className="invoicesListTable table full-width">
                <this.TableHeader/>
                 <this.TableBody />
                </table>
            </div>
        )
    }
}

export default Shop