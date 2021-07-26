import { useHistory } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faSearch

} from '@fortawesome/free-solid-svg-icons'


const Nav: React.FC = () => {

	const history = useHistory()

	return (
		<div style={{display: "flex", alignItems: "center"}}>
			<div style={{border: "1px solid", display: "inline-flex", borderRadius: "3px", color: "grey"}}>
				<div style={{borderRight: "1px solid", padding: "5px"}}>
					<FontAwesomeIcon icon={faSearch} />
				</div>
				<input style={{outline: "none", border: "none"}} placeholder="Search vendors" onClick={()=>history.push("/vendors")}/>
			</div>
			<div onClick={()=>history.push("/vendors/add")}>
				add
			</div>
		</div>
	)
}

export default Nav