import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import App from "./components/app"
import Success from "./components/success"
import "bootstrap/dist/css/bootstrap.min.css"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/success' component={Success} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(<Routes />, document.getElementById("root"))
