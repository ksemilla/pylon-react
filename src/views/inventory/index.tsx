import { Route } from 'react-router-dom'

import Nav from "./components/Nav"

import List from "./components/List"
import Add from "./components/Add"

import { Container } from "styles/containers"

type InventoryProps = {
	match: {
		url: string
	}
}

const Inventory: React.FC<InventoryProps> = ({ match: { url } }) => {
	return (
		<Container padding="5px">
			<Nav />
			<Route path={`${url}/`} component={List} exact/>
			<Route path={`${url}/add`} component={Add} exact/>
		</Container>
	)
}

export default Inventory