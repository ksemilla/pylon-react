import styled from "styled-components";

interface ContainerType {
	padding?: string,
}

export const Container = styled.div<ContainerType>`
	width: 100%;
	padding: ${props => props.padding ? props.padding : ""};
`