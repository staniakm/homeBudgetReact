import React, { Component } from 'react'
import * as url from '../../navigation/ulrs'
import { connect } from 'react-redux';
import { setMonth } from '../../actions'

class Invoice extends Component {
    state = {
        isLoaded: false,
        month: 0,
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
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.listId} onClick={() => this.onItemClick(item)}>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.price} zł</td>
                </tr>
            )
            )}
        </tbody>
    );

    NavigationTab = () => (
        <div className="rowC">
            <input className="button" type="button" value="poprzedni miesiąc" onClick={() => this.changeMonth(-1)}></input>
            <input className="button" type="button" value="obecny miesiąc" onClick={() => this.changeMonth(0)}></input>
            <input className="button" type="button" value="następny miesiąc" onClick={() => this.changeMonth(1)}></input>
        </div>
    )

    onItemClick = (item) => {
        this.props.history.push(`/invoice/${item.listId}`)
    }

    changeMonth = (value) => {
        const month = (value===0) ? 0 : this.props.month + value
        this.props.setMonth(month);
        this.loadData(month)
    }

    componentDidMount() {
        this.loadData(this.props.month)
    }

    render() {
        return (
            <div>
                <this.NavigationTab />
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
        month: state.monthReducer.month
    }
};

const mapDispatchToProps = ({ 
    setMonth: setMonth 
});


export default connect(mapStateToProps, mapDispatchToProps)(Invoice);