import React, { Component } from 'react'
import * as url from '../../Navigation/ulrs'
import { withRouter } from 'react-router'
import IDTable from './InvoiceDetailsActions'

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
        console.log(item)
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

export default withRouter(InvoiceDetails)