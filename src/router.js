import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Home from './SPA/Home'
import Shoppings from './SPA/Shoppings'
import ShoppingDetails from './SPA/ShoppingDetails'
import Category from './SPA/Category/Category';
import CategoryDetails from './SPA/Category/CategoryDetails'
import ItemDetails from './SPA/ItemDetails'
import Shop from './SPA/Shop/Shop'
import ShopItems from './SPA/Shop/ShopItems'
import Charts from './SPA/Charts'

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <App>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/charts"} component={Charts} />
                <Route exact path={"/shopping"} component={Shoppings} />
                <Route exact path={"/category"} component={Category} />
                <Route exact path={"/shop"} component={Shop}/>
                <Route exact path={"/shopping/:id"}
                    render={(props) => <ShoppingDetails id={props.match.params.id} />}
                    name="shoppingDetails" />
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