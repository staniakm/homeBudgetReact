import React, { Component } from 'react'
import { BASE_URL } from '../../Navigation/ulrs'
import { Table } from 'reactstrap';

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
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                </tr>
            )
            )}
        </tbody>
    );

    componentDidMount() {
        fetch(BASE_URL + "category/" + this.props.id)
            .then(response => response.json())
            .then(data => this.setState({
                data,
                isLoaded: true
            }))
    };



    render() {
        return (
            <div>
                <h1>Wydatki w danej kategorii w obecnym miesiącu</h1>
                <Table striped>
                    <this.TableHeader />
                    <this.TableBody />
                    </Table>
            </div>
        )
    }
}

export default CategoryDetails