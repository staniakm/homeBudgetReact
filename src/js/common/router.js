import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../containers/App'
import Home from '../components/Home/Home'
import Invoice from '../containers/Invoice/Invoice'
import InvoiceDetails from '../containers/Invoice/InvoiceDetails'
import Category from '../containers/Category/Category';
import CategoryDetails from '../containers/Category/CategoryDetails'
import ItemDetails from '../containers/ItemDetails/ItemDetails'
import Shop from '../containers/Shop/Shop'
import ShopItems from '../containers/Shop/ShopItems'
import MonthSpendingChart from '../components/Charts/MonthSpendingCharts'
import MonthBudget from '../containers/Budget/MonthBudget';
import AccountDetails from '../containers/AccountDetails/AccountDetails'

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <App>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/charts"} component={MonthSpendingChart} />
                <Route exact path={"/invoice"} component={Invoice} />
                <Route exact path={"/budget"} component={MonthBudget} />
                <Route exact path={"/category"} component={Category} />
                <Route exact path={"/shop"} component={Shop}/>
                <Route exact path={"/account"} component={AccountDetails}/>
                <Route exact path={"/invoice/:id"}
                    render={(props) => <InvoiceDetails id={props.match.params.id} />}
                    name="invoiceDetails" />
                <Route exact path={"/category/:id"}
                    render={(props) => <CategoryDetails id={props.match.params.id} />}
                    name="categoryDetails" />
                <Route exact path={"/item/:id"}
                    render={(props) => <ItemDetails id={props.match.params.id} />}
                    name="itemDetails"/>
                <Route exact path={"/shop/:id/month"}
                    render={(props) => <ShopItems id={props.match.params.id} />}
                    name="shopItems"/>
                <Route exact path={"/shop/:id/year"}
                    render={(props) => <ShopItems id={props.match.params.id} />}
                    name="shopItems"/>
            </App>
        </Switch>

    </BrowserRouter>

);
