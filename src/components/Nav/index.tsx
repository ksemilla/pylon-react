import Logo from "./components/Logo"

import NavComponent, { Pill } from "styles/nav"

const Nav: React.FC = () => {
	return (
		<NavComponent>
			<Logo />
			<Pill>
				test
			</Pill>
		</NavComponent>
	)
}

export default Nav