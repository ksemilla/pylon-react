import { Route } from 'react-router-dom'

import Nav from "./components/Nav"

import List from "./components/List"
import Add from "./components/Add"

import { Container } from "styles/containers"

type VendorType = {
	match: {
		url: string
	}
}

const Vendor: React.FC<VendorType> = ({ match: { url } }) => {
	return (
		<Container padding="5px">
			<Nav />
			<Route path={`${url}/`} component={List} exact/>
			<Route path={`${url}/add`} component={Add} exact/>
		</Container>
	)
}

export default Vendor