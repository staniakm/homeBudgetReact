import React, {Component} from 'react'
import * as url from '../../common/ulrs'
import sorter from '../../common/Util/Sort'
import {Table} from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux'
import {setMonth} from '../../actions';
import NavigationTab from '../../components/Navigation/NavigationTab'
import {formatCurrency} from '../../common/CurrencyFormat'
import {FaSearch,FaList} from 'react-icons/fa';


class Category extends Component {

    state = {
        isLoaded: false,
        data: [],
        ascOrder: true
    }

    sortBy(key) {
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
            <th scope="col" onClick={() => this.sortBy('monthSummary')}>Koszt w {this.props.monthValue} (zł)</th>
            <th scope="col" onClick={() => this.sortBy('yearSummary')}>Koszt
                w {this.props.monthValue.substring(0, 4)} roku (zł)
            </th>
            <th>Pozycje</th>
        </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.id}>
                    <td>{item.name}</td>
                    <td>{formatCurrency(item.monthSummary)}</td>
                    <td>{formatCurrency(item.yearSummary)}</td>
                    <td><FaList className="clickable" onClick={() => this.onCategoryClick(item.id)}/></td>
                </tr>
            )
        )}
        </tbody>
    );

    onCategoryClick = (item) => {
        this.props.history.push(`/category/${item}`)
    }

    componentDidMount() {
        this.loadData(this.props.month);
    }

    loadData = month => {
        axios.get(url.CATEGORY + `?month=${month}`)
            .then(response =>
                this.setState({
                    data: response.data,
                    isLoaded: true
                }))
    }

    render() {
        return (
            <div>
                <NavigationTab onclick={this.loadData}/>
                <Table striped>
                    <this.TableHeader/>
                    <this.TableBody/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Category)
