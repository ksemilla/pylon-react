import styled from "styled-components"

const Container = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
	color: #547686;
	font-size: 30px;
`

const Img = styled.img`
	width: 40px;
	margin-right: 5px;
`

const Logo: React.FC = () => {
	return (
		<Container>
			<Img src="/logo.png" alt="logo" />
			Pylon
		</Container>
	)
}

export default Logo