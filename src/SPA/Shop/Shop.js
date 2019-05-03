import React, { Component } from 'react'
import { BASE_URL } from '../../Navigation/ulrs'
import { Table ,Button} from 'reactstrap';
import sorter from '../../Util/Sort'
import {connect} from 'react-redux';
import { setMonth, setBudget } from '../../Action';
class Shop extends Component {

    state = {
        isLoaded: false,
        data: [],
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
                <th scope="col" onClick={() => this.sortBy('monthSum')}>Wydane w {this.props.monthValue}</th>
                <th scope="col" onClick={() => this.sortBy('yearSum')}>Wydane od poczatku {this.props.monthValue.substring(0, 4)} r.</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow clickable" key={item.shopId} >
                    <td onClick={() => this.onShopClick(item)}>{item.name}</td>
                    <td onClick={() => this.onShopMonthSpendClick(item)} onHov>{item.monthSum}</td>
                    <td onClick={() => this.onShopYearSpendClick(item)}>{item.yearSum}</td>
                </tr>
            )
            )}
        </tbody>
    );

    onShopClick = (shop) => {
        console.log(shop)
    }

    onShopMonthSpendClick = (shop) => {
        this.props.history.push(`/shop/${shop.shopId}/month`)
    }

    onShopYearSpendClick = (shop) => {
        this.props.history.push(`/shop/${shop.shopId}/year`)
    }

    componentDidMount() {
        this.loadData(0)
    }

    loadData = month => {
        fetch(BASE_URL + `shop?month=${month}`)
        .then(response => response.json())
        .then(data => this.setState({
            data: data,
            isLoaded: true
        }))
    }

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

    render() {
        return (
            <div>
                {/* <h1>Sklepy {this.props.monthValue}</h1> */}
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
        budgetData: state.budgetReducer.budgetData
    }
};

const mapDispatchToProps = ({
    setMonth,
    setBudget
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop)