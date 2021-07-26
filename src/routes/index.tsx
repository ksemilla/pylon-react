import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from "./utils/PrivateRoute"
import PublicRoute from "./utils/PublicRoute"

import Login from "views/login"

import Home from 'views/home'

import Inventory from 'views/inventory'
import Vendor from 'views/vendors'
import Nav from 'components/Nav'
import SideNav from 'components/SideNav'

const Routes: React.FC = () => {
  return (
    <Router>
			<Switch>
				<PublicRoute path="/login" component={Login} exact />

				<Route>
					<Nav />
					<div style={{display: "flex", height: "100%"}}>
						<SideNav />
						<PrivateRoute path="/" render={Home} />
						<PrivateRoute path="/inventory" render={Inventory} />
						<PrivateRoute path="/vendors" render={Vendor} />
					</div>
				</Route>

				{/* <Route path="" component={Page404} /> */}
			</Switch>
    </Router>
  );
}

export default Routes
