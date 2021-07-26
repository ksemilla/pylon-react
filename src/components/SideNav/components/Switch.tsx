import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
	faArrowRight,
	faCaretLeft
} from '@fortawesome/free-solid-svg-icons'

import styled from "styled-components"

const IconWrapper = styled.div`
	color: black;
	width: 40px;
	text-align: center;
`

const SwtichWrapper = styled.div`
	margin: 0px 5px 5px 5px;
	padding: 10px;
	border-bottom: 1px solid;
	display: flex;
	align-items: center;
	height: 30px;
	white-space: nowrap;
	&:hover {
		cursor: pointer;
		background-color: ${props => props.theme.color.bgHover};
	}
`

type ItemProps = {
	open: boolean;
	onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ open, onClick }) => {
	return (
		<SwtichWrapper onClick={onClick}>
			{open ? <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
					<FontAwesomeIcon icon={faCaretLeft} size="lg" />
				</div>
			: <IconWrapper>
				<FontAwesomeIcon icon={faArrowRight} size="lg" />
			</IconWrapper>}
			
		</SwtichWrapper>
	)
}

export default Item