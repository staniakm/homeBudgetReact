import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Home from './SPA/Home'
import Invoice from './SPA/Invoice/Invoice'
import InvoiceDetails from './SPA/Invoice/InvoiceDetails'
import Category from './SPA/Category/Category';
import CategoryDetails from './SPA/Category/CategoryDetails'
import ItemDetails from './SPA/ItemDetails'
import Shop from './SPA/Shop/Shop'
import ShopItems from './SPA/Shop/ShopItems'
import MonthSpendingChart from './SPA/Charts/MonthSpendingCharts'
import MonthBudget from './SPA/Budget/MonthBudget';
import BudgetEdit from './SPA/Budget/BudgetEdit';

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <App>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/charts"} component={MonthSpendingChart} />
                <Route exact path={"/invoice"} component={Invoice} />
                <Route exact path={"/budget"} component={MonthBudget} />
                <Route exact path={"/budget/edit"} component={BudgetEdit}/>
                <Route exact path={"/category"} component={Category} />
                <Route exact path={"/shop"} component={Shop}/>
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