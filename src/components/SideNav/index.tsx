import { useState } from "react"
import styled from "styled-components"

import {
	faBoxes,
	faDesktop,
	faStickyNote,
	faUsers,
	faBookmark,
	faCogs,
	faFileInvoice,
	faCreditCard,
	faShoppingBag,
	faChartLine,
	faUserShield,

} from '@fortawesome/free-solid-svg-icons'

import Item from "./components/Item"
import Switch from "./components/Switch"

interface DrawerProps {
	open?: boolean;
}

const Drawer = styled.div<DrawerProps>`
	height: inherit;
	width: ${props => props.open ? "250px" : "72px"};
	transition: all 0.3s ease-out;
	overflow: hidden;
	color: ${props => props.open ? "black" : "transparent"};
	border: 1px solid black;
`

const SideNav: React.FC = () => {

	const [showSideNav, setShowSidenav] = useState<boolean>(true)

	return (
		<Drawer open={showSideNav} >
			<Switch open={showSideNav} onClick={()=>setShowSidenav(prevState => !prevState)}/>
			<Item icon={faDesktop} path="/" >Dashboard</Item>
			<Item icon={faBoxes} path="/inventory" >Inventory</Item>
			<Item icon={faStickyNote} path="/" >Quotations</Item>
			<Item icon={faUsers} path="/" >Customers</Item>
			<Item icon={faBookmark} path="/" >Customer Orders</Item>
			<Item icon={faCogs} path="/" >Job Orders</Item>
			<Item icon={faFileInvoice} path="/" >Invoices</Item>
			<Item icon={faCreditCard} path="/" >Credit</Item>
			<Item icon={faShoppingBag} path="/" >Purcahse Orders</Item>
			<Item icon={faShoppingBag} path="/vendors" >Vendors</Item>
			<Item icon={faChartLine} path="/" >Sales</Item>
			<Item icon={faUserShield} path="/" >Admin</Item>
		</Drawer>
	)
}

export default SideNav