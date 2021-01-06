import React, {Component} from 'react'
import * as url from '../../common/ulrs'
import {connect} from 'react-redux';
import {setMonth} from '../../actions'
import NavigationTab from '../../components/Navigation/NavigationTab'
import {InvoiceList} from "./InvoiceList";


class Invoice extends Component {
    state = {
        isLoaded: false,
        data: []
    }

    loadData = (value) => {
        fetch(`${url.INVOICE}?month=${value}`)
            .then(response => response.json())
            .then(data => this.setState({
                data,
                isLoaded: true
            }))
    }

    componentDidMount() {
        this.loadData(this.props.month)
    }

    render() {
        if (!this.state.isLoaded) {
            return (<div>Loading..</div>)
        }
        return (
            <div>
                <NavigationTab onclick={this.loadData}/>
                {this.state.isLoaded &&
                <InvoiceList
                    data={this.state.data}
                    month={this.props.monthValue}
                />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        month: state.monthReducer.month,
        monthValue: state.monthReducer.monthValue,
    }
};

const mapDispatchToProps = ({
    setMonth: setMonth
});


export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
