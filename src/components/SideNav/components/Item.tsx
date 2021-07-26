import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  IconDefinition,
} from '@fortawesome/fontawesome-svg-core'

import styled from "styled-components"


const IconWrapper = styled.span<IconWrapperProps>`
	display: inline-block;
	text-align: center;
	color: black;
	width: 40px;
`

const ItemWrapper = styled.div`
	margin: 0px 5px 5px 5px;
	padding: 10px;
	height: 25px;
	white-space: nowrap;
	&:hover {
		cursor: pointer;
		background-color: ${props => props.theme.color.bgHover};
	}
`

interface IconWrapperProps {
	// open: boolean;
}

type ItemProps = {
	icon: IconDefinition;
	path: string;
}

const Item: React.FC<ItemProps> = ({ children, icon, path }) => {

	const history = useHistory()

	return (
		<ItemWrapper onClick={()=>history.push(path)}>
			<IconWrapper>
				<FontAwesomeIcon icon={icon} size="lg" />
			</IconWrapper>
			<span>
				{children}
			</span>
		</ItemWrapper>
	)
}

export default Item