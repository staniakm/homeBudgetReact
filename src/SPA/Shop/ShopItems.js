import React, { Component } from 'react'
import { BASE_URL } from '../../Navigation/ulrs'
import { withRouter } from 'react-router'
import { selectProduct, setShopItems } from '../../Action'
import { connect } from 'react-redux'
import axios from 'axios';

class ShopItems extends Component {

    state = {
        isLoaded: false,
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
            {this.state.isLoaded && this.props.shopItems.map(item => (
                <tr className="oneRow clickable" key={item.id} onClick={() => this.itemDetails(item)}>
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

    itemDetails = (item) => {
        this.props.selectProduct(item)
        this.props.history.push(`/item/` + item.itemId)
    }

    componentDidMount() {
        const path = this.props.location.pathname
        axios.get(`${BASE_URL}${path}`)
            .then(response => response.data)
            .then(data => (this.props.setShopItems(data)))
            .then(() => this.setState({
                isLoaded: true
            }))
    }

    render() {
        return (
            <div>
                <h2>Sklep - produkty</h2>
                <table className="invoicesListTable table full-width">
                    <this.TableHeader />
                    <this.TableBody />
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.invoiceReducer.product,
        shopItems: state.shopReducer.shopItems
    }
};

const mapDispatchToProps = ({
    selectProduct,
    setShopItems
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopItems))