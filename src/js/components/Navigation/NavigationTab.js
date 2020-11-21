import React from 'react'
import { Button } from 'reactstrap'
import {connect} from 'react-redux';
import { setMonth, setBudget } from '../../actions';

const NavigationTab = props => {

    const changeMonth = (value) => {
        const month = (value === 0) ? 0 : props.month + value
        props.setMonth(month);
        props.onclick(month)
    }
    return (
        <div className="rowC">
            <Button outline color="success" onClick={() => changeMonth(-1)}>Poprzedni miesiąc</Button>
            <Button outline color="success" onClick={() => changeMonth(0)}>Obecny miesiąc</Button>
            <Button  disabled={props.month === 0} outline color="success" onClick={() => changeMonth(1)}>Następny miesiąc</Button>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTab)
