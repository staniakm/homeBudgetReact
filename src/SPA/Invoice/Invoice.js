import React, { Component } from 'react'
import * as url from '../../navigation/ulrs'

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

    onItemClick = (item) => {
        this.props.history.push(`/invoice/${item.listId}`)
    }

    previousMonth = () => {
        const month = this.state.month - 1;
        this.setState({
            month: month,
            isLoaded: false
        })
        this.loadData(month)
    }

    nextMonth = () => {
        const month = this.state.month + 1;
        this.setState({
            month: month,
            isLoaded: false
        })
        this.loadData(month)
    }

    componentDidMount() {
        this.loadData(0)
    }

    render() {
        const style = { textAlign: 'center', width: '100%' }
        return (
            <div>
                <div className="rowC">
                    <input className="button" type="button" value="poprzedni" onClick={this.previousMonth}></input>
                    <h1 style={style}>Paragony</h1>
                    <input className="button" type="button" value="następny" onClick={this.nextMonth}></input>
                </div>
                <table className="invoicesListTable table full-width">
                    <this.TableHeader />
                    <this.TableBody />
                </table>
            </div>
        )
    }
}

export default Invoice;