import React, { Component } from 'react'
import * as url from '../../common/ulrs'
import { withRouter } from 'react-router'
import IDTable from './InvoiceDetailsActions'
import { connect } from 'react-redux';
import {selectProduct} from '../../actions'
class InvoiceDetails extends Component {
    state = {
        isLoaded: false,
        data: []
    }

    componentDidMount() {
        fetch(`${url.INVOICE}${this.props.id}`)
            .then(response => response.json())
            .then(data => this.setState({
                data,
                isLoaded: true
            }))
    };

    itemDetails = (item) => {
        this.props.selectProduct(item)
        this.props.history.push(`/item/` + item.itemId)
    }

    render() {
        return (
            <div>
                <h1>Szczegóły paragonu</h1>
                {this.state.isLoaded &&
                    <IDTable data={this.state.data} onClick={this.itemDetails} />
                }
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
    selectProduct
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceDetails))
