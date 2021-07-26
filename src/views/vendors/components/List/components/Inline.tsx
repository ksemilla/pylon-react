import {
	VendorType
} from "stores/common/CommonStore"
import styled from "styled-components"

const Item = styled.div`
	padding: 5px;
	&:hover {
		cursor: pointer;
		background-color: #BBB;
	}
`

const Inline: React.FC<{vendor: VendorType}> = ({ vendor }) => {
	return (
		<Item>
			{vendor.code}
		</Item>
	)
}

export default Inline