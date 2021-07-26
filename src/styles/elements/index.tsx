import styled from "styled-components"

interface GroupType {
	size?: number,
}

export const Row = styled.div`
	display: flex;
	justtify-content: space-between;
	column-gap: 5px;
	margin-bottom: 10px;
`

export const Group = styled.div<GroupType>`
	flex: ${props => props.size ? props.size : "1"};
	margin-bottom: 10px;
`

export const Label = styled.label`
	display: block;
	font-weight: 500;
	margin-bottom: 3px;
`

export const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: 3px;
	&:focus {
		outline: none;
	}
`

export const Select = styled.select`
	width: 100%;
	box-sizing: border-box;
	padding: 3px;
	&:focus {
		outline: none;
	}
`

export const Button = styled.button`
	width: 100%;
	// border: none;
`