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
            <th scope="col">Wydane w tym miesiącu</th>
            <th scope="col">Wydane w tym roku</th>
        </tr>
        </thead>
    );
    
    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.shopId} >
                    <td onClick={() => this.onShopClick(item)}>{item.name}</td>
                    <td onClick={() => this.onShopMonthSpendClick(item)}>{item.monthSum}</td>
                    <td onClick={() => this.onShopYearSpendClick(item)}>{item.yearSum}</td>
                </tr>
            )
        )}
        </tbody>
    );

    onShopClick = (shop) => {
        console.log(shop)
    }

    onShopMonthSpendClick = (shop) => {
        this.props.history.push(`/shop/${shop.shopId}/month`)
    }
    
    onShopYearSpendClick = (shop) => {
        console.log(shop.yearSum)
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