import React, { Component } from 'react'
import { BASE_URL } from '../../Navigation/ulrs'
import sorter from '../../Util/Sort'
import { Table } from 'reactstrap';
class Category extends Component {

    state = {
        isLoaded: false,
        data: [],
        ascOrder:true
    }

    sortBy(key){
        const {data, ascOrder} = this.state
        const sorted = sorter(key, data, ascOrder)
        this.setState({
            data: sorted,
            ascOrder: !ascOrder
        })
    }

    TableHeader = () => (
        <thead>
            <tr className="oneRow sortable">
                <th scope="col" onClick={() => this.sortBy('name')}>Nazwa</th>
                <th scope="col" onClick={() => this.sortBy('monthSummary')}>Koszt w danym miesiącu (zł)</th>
                <th scope="col" onClick={() => this.sortBy('yearSummary')}>Koszt w danym roku (zł)</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow clickable" key={item.id} onClick={() => this.onCategoryClick(item)}>
                    <td>{item.name}</td>
                    <td>{item.monthSummary}</td>
                    <td>{item.yearSummary}</td>
                </tr>
            )
            )}
        </tbody>
    );

    onCategoryClick = (item) => {
        this.props.history.push(`/category/${item.id}`)
    }

    componentDidMount() {
        fetch(BASE_URL + "category")
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
                isLoaded: true
            }))
    }

    render() {
        return (
            <div>
                <h1>Lista kategorii</h1>
                {/* <table className="invoicesListTable table full-width"> */}
                <Table striped>
                    <this.TableHeader />
                    <this.TableBody />
                    </Table>
            </div>
        )
    }
}

export default Category