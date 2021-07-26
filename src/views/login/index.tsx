import styled from "styled-components"

import Form, { FormDataType } from "./components/Form"
import { login } from "api/login"
import { observer } from "mobx-react-lite"
import { useAuthStore } from "stores/auth"
import { useHistory } from "react-router-dom"

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Name = styled.span`
	font-weight: 700;
	color: #547686;
	font-size: 50px;
`

const Login: React.FC = () => {

	const history = useHistory()
	const authProvider = useAuthStore()
	const authStore = authProvider.authStore

	const onSubmit = (data: FormDataType) => {
		login(data)
		.then(res=>{
			authStore.login({
				...res.data.user,
				access: res.data.access
			})
			localStorage.setItem('access', res.data.access)
			history.push("/")
		})
		.catch(res=>{
			console.log(res.response)
		})
	}

	return (
		<Container>
			<div style={{padding: "15px", width: "100%", maxWidth: "400px"}}>

				<div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px"}}>
					<img src="/logo.png" alt="logo" style={{width: "90px"}}/>
					<Name>Pylon</Name>
				</div>

				<div>
					{/* <div style={{width: "100%", margin: "auto", textAlign: "center", fontWeight: 700, fontSize: "30px"}}>
						Login
					</div> */}

					<Form
						onSubmit={onSubmit}
					/>

				</div>

			</div>
		</Container>
	)
}

export default observer(Login)