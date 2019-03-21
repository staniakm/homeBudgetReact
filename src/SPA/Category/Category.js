import React, { Component } from 'react'
import { BASE_URL } from '../../navigation/ulrs'


class Category extends Component {

    state = {
        isLoaded: false,
        data: [],
        ascOrder:true
    }

    compareAscBy(key) {
        return function (a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
      }
    
      compareDescBy(key) {
        return function (a, b) {
          if (a[key] > b[key]) return -1;
          if (a[key] < b[key]) return 1;
          return 0;
        };
      }

      sortBy(key) {
        const ascOrder = this.state.ascOrder;
        let arrayCopy = [...this.state.data];
        arrayCopy.sort(ascOrder ? this.compareAscBy(key): this.compareDescBy(key));
        this.setState({data: arrayCopy, ascOrder: ! ascOrder});
      }

    TableHeader = () => (
        <thead>
            <tr className="oneRow">
                <th scope="col" onClick={() => this.sortBy('name')}>Nazwa</th>
                <th scope="col" onClick={() => this.sortBy('monthSummary')}>Koszt w danym miesiącu (zł)</th>
                <th scope="col" onClick={() => this.sortBy('yearSummary')}>Koszt w danym roku (zł)</th>
            </tr>
        </thead>
    );

    TableBody = () => (
        <tbody>
            {this.state.isLoaded && this.state.data.map(item => (
                <tr className="oneRow" key={item.id} onClick={() => this.onCategoryClick(item)}>
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
                <table className="invoicesListTable table full-width">
                    <this.TableHeader />
                    <this.TableBody />
                </table>
            </div>
        )
    }
}

export default Category