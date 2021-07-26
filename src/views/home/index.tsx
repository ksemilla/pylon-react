import { Route } from 'react-router-dom'

import Dashboard from "./components/Dashboard"

type DashboardProps = {
	match: {
		url: string
	}
}

const Inventory: React.FC<DashboardProps> = ({ match: { url } }) => {
	return (
			// <div style={{width: "100%", padding: "0px 10px 10px 10px"}}>
			// 	<Route path={`${url}/`} component={Dashboard} exact/>
			// </div>
			<div>
				<Route path={`${url}/`} component={Dashboard} exact/>
			</div>
	)
}

export default Inventory