import React, { Component } from 'react'
import * as url from '../../Navigation/ulrs'
import sorter from '../../Util/Sort'
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux'
import { setMonth} from '../../Action';

class Category extends Component {

    state = {
        isLoaded: false,
        data: [],
        ascOrder: true
    }

    sortBy(key) {
        const { data, ascOrder } = this.state
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
                <th scope="col" onClick={() => this.sortBy('monthSummary')}>Koszt w {this.props.monthValue} (zł)</th>
                <th scope="col" onClick={() => this.sortBy('yearSummary')}>Koszt w {this.props.monthValue.substring(0, 4)} roku (zł)</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow clickable" key={item.id} onClick={() => this.onCategoryClick(item.id)}>
                    <td>{item.name}</td>
                    <td>{item.monthSummary}</td>
                    <td>{item.yearSummary}</td>
                </tr>
            )
            )}
        </tbody>
    );

    NavigationTab = () => (
        <div className="rowC">
            <Button outline color="success" onClick={() => this.changeMonth(-1)}>Poprzedni miesiąc</Button>
            <Button outline color="success" onClick={() => this.changeMonth(0)}>Obecny miesiąc</Button>
            <Button outline color="success" onClick={() => this.changeMonth(1)}>Następny miesiąc</Button>
        </div>
    )

    changeMonth = (value) => {
        const month = (value === 0) ? 0 : this.props.month + value
        this.props.setMonth(month);
        this.loadData(month)
    }

    onCategoryClick = (item) => {
        this.props.history.push(`/category/${item}`)
    }

    componentDidMount() {
        this.loadData(0);
    }

    loadData = month => {
        axios.get(url.CATEGORY+`?month=${month}`)
            .then(response =>
                this.setState({
                    data: response.data,
                    isLoaded: true
                }))
    }

    render() {
        return (
            <div>
                <this.NavigationTab />
                <Table striped>
                    <this.TableHeader />
                    <this.TableBody />
                </Table>
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
    setMonth,
});

export default connect(mapStateToProps, mapDispatchToProps) (Category)