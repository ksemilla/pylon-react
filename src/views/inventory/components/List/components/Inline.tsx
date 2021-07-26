import {
	StockType,
	LaborType,
	DocumentType,
	AssemblyType
} from "stores/common/CommonStore"
import styled from "styled-components"

const Item = styled.div`
	border-bottom: 1px solid;
	&:hover {
		cursor: pointer;
	}
`

const Inline: React.FC<{inventory: (StockType|LaborType|DocumentType|AssemblyType)}> = ({ inventory }) => {
	return (
		<Item>
			{inventory.part_number}
		</Item>
	)
}

export default Inline