import React, {Component} from 'react'
import {BASE_URL} from '../navigation/ulrs'
import {withRouter} from 'react-router'

class ItemDetails extends Component {

    render() {
        return (
            <div>
                <h1>Szczegóły produktu</h1>
                <p>Description</p>
            </div>
        )
    }

}

export default withRouter( ItemDetails)