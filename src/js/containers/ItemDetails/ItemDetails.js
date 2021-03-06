import React, {Component} from 'react'
import {BASE_URL} from '../../common/ulrs'
import {withRouter} from 'react-router'
import axios from 'axios';
import {Table} from 'reactstrap';
import {selectProduct} from '../../actions'
import {connect} from 'react-redux'
import {formatCurrency} from '../../common/CurrencyFormat'

class ItemDetails extends Component {
    state = {
        items: [],
        isLoaded: false
    }

    TableHeader = () => (
        <thead>
        <tr className="oneRow">
            <th scope="col">Sklep</th>
            <th scope="col">Data</th>
            <th scope="col">Cena</th>
            <th scope="col">Ilość</th>
            <th scope="col">Rabat</th>
            <th scope="col">Suma paragonu</th>
        </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.items.map(item => (
                <tr className="oneRow" key={item.invoiceItemId}>
                    <td>{item.shopName}</td>
                    <td>{item.invoiceDate}</td>
                    <td>{formatCurrency(item.itemPrice)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.discount)}</td>
                    <td>{formatCurrency(item.totalSum)}</td>
                </tr>
            )
        )}
        </tbody>
    );

    componentDidMount() {
        const path = this.props.location.pathname
        axios.get(BASE_URL + path)
            .then(resp => {
                const items = resp.data
                if(items.length > 0)
                    this.setState({productName: items[0].productName})
                else {
                    this.setState({productName: "no name"})
                }
                this.setState({
                    items: items,
                    isLoaded: true
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Szczegóły dla produktu '{this.state.productName}'</h1>
                <Table striped>
                    <this.TableHeader/>
                    <this.TableBody/>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.invoiceReducer.product
    }
};

const mapDispatchToProps = ({
    selectProduct: selectProduct
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDetails))
