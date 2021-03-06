import React, {useState, useEffect} from 'react'
import * as url from '../../common/ulrs'
import {Table} from 'reactstrap';
import axios from 'axios';
import {setMonth} from "../../actions";
import {connect} from "react-redux";
import {formatCurrency} from "../../common/CurrencyFormat";

const CategoryDetails = props => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState({})
    const [details, setDetails] = useState({})

    const TableHeader = () => (
        <thead>
        <tr className="oneRow">
            <th scope="col">Nazwa</th>
            <th scope="col">Koszt</th>
        </tr>
        </thead>
    );

    const TableBody = () => (
        <tbody>
        {isLoaded && details.map(item => (
                <tr className="oneRow" key={item.id}>
                    <td>{item.name}</td>
                    <td>{formatCurrency(item.price)}</td>
                </tr>
            )
        )}
        </tbody>
    );

    const fetchData = () => {
        setIsLoaded(false)
        axios.get(`${url.CATEGORY}${props.id}?month=${props.month}`)
            .then(res => {
                axios.get(`${url.CATEGORY}${props.id}/details?month=${props.month}`)
                    .then(r => {
                        console.log("details", r.data)
                        setData(res.data)
                        setDetails(r.data)
                        setIsLoaded(true)
                    })
            })
            .catch(e => console.log("Error fetching category details"))


    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h3>Wydatki w kategorii {data.name} wyniosły {data.monthSummary} zł</h3>
            <Table striped>
                <TableHeader/>
                <TableBody/>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        month: state.monthReducer.month
    }
};

const mapDispatchToProps = ({
    setMonth: setMonth
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails)
