import React, { Component } from 'react'
import * as url from '../../Navigation/ulrs'
import { Table } from 'reactstrap';
import axios from 'axios';
class CategoryDetails extends Component {

    state = {
        isLoaded: false,
        data: []
    }

    TableHeader = () => (
        <thead>
            <tr className="oneRow">
                <th scope="col">Nazwa</th>
                <th scope="col">Koszt</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.state.data.details.map(item => (
                <tr className="oneRow" key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                </tr>
            )
            )}
        </tbody>
    );

    componentDidMount() {
        axios.get(url.CATEGORY + this.props.id)
            .then(res => this.setState({
                data: res.data,
                isLoaded: true
            }))
    };

    render() {
        return (
            <div>
                <h3>Wydatki w kategorii {this.state.data.name} w obecnym miesiącu wyniosły {this.state.data.monthSummary} zł</h3>
                <Table striped>
                    <this.TableHeader />
                    <this.TableBody />
                </Table>
            </div>
        )
    }
}

export default CategoryDetails