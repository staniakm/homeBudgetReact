import React, {Component} from 'react'
import {SHOP} from '../../common/ulrs'
import {Table} from 'reactstrap';
import sorter from '../../common/Util/Sort'
import {connect} from 'react-redux';
import {setBudget, setMonth} from '../../actions';
import NavigationTab from '../../components/Navigation/NavigationTab'
import {formatCurrency} from '../../common/CurrencyFormat'
import {FaSearch} from 'react-icons/fa';


class Shop extends Component {

    state = {
        isLoaded: false,
        data: [],
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
            <th scope="col" onClick={() => this.sortBy('monthSum')}>Wydane w {this.props.monthValue}</th>
            <th scope="col" onClick={() => this.sortBy('yearSum')}>Wydane od
                poczatku {this.props.monthValue.substring(0, 4)} r.
            </th>
        </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
        {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow " key={item.shopId}>
                    <td>
                        <div className="rowIcon"><p>{item.name}</p>
                            <FaSearch className="clickable"
                                      onClick={() => this.onShopClick(item)}/></div>
                    </td>
                    <td>
                        <div className="rowIcon">
                            <p>{formatCurrency(item.monthSum)}</p>
                            <FaSearch className="clickable" onClick={() => this.onShopMonthSpendClick(item)}/>
                        </div>
                    </td>
                    <td>
                        <div className="rowIcon">
                            <p>{formatCurrency(item.yearSum)}</p>
                            <FaSearch className="clickable" onClick={() => this.onShopYearSpendClick(item)}/></div>
                    </td>
                </tr>
            )
        )}
        </tbody>
    );

    onShopClick = (shop) => {
        console.log(shop)
    }

    onShopMonthSpendClick = (shop) => {
        this.props.history.push(`shop/${shop.shopId}/month`)
    }

    onShopYearSpendClick = (shop) => {
        this.props.history.push(`shop/${shop.shopId}/year`)
    }

    componentDidMount() {
        this.loadData(this.props.month)
    }

    loadData = month => {
        fetch(SHOP + `?month=${month}`)
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
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
        budgetData: state.budgetReducer.budgetData
    }
};

const mapDispatchToProps = ({
    setMonth,
    setBudget
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
