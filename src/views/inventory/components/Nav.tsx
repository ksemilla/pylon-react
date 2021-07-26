// import { useHistory, useLocation } from "react-router-dom"
import { useHistory } from "react-router-dom"
// import { useEffect, useState } from "react"
// import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faSearch

} from '@fortawesome/free-solid-svg-icons'

// interface ItemProps {
// 	selected?: boolean;
// }

// const Item = styled.div<ItemProps>`
// 	padding: 5px 10px;
// 	border-bottom: ${props => props.selected ? "none" : "1px solid black"};
// 	border-top: ${props => props.selected ? "1px solid black" : "none"};
// 	border-right: ${props => props.selected ? "1px solid black" : "none"};
// 	border-left: ${props => props.selected ? "1px solid black" : "none"};
// 	&:hover {
// 		cursor: pointer;
// 		color: ${props => props.theme.color.main};
// 	}
// `

const Nav: React.FC = () => {

	const history = useHistory()
	// const location = useLocation()
	// const segments = location.pathname.split("/")

	// const [eventKey, setEventKey] = useState<string>("list")

	// useEffect(()=>{
	// 	console.log(eventKey)
	// }, [eventKey])

	return (
		<div style={{display: "flex", alignItems: "center"}}>
			<div style={{border: "1px solid", display: "inline-flex", borderRadius: "3px", color: "grey"}}>
				<div style={{borderRight: "1px solid", padding: "5px"}}>
					<FontAwesomeIcon icon={faSearch} />
				</div>
				<input style={{outline: "none", border: "none"}} placeholder="Search inventory" onClick={()=>history.push("/inventory")}/>
			</div>
			<div onClick={()=>history.push("/inventory/add")}>
				add
			</div>
		</div>
	)
}

export default Nav