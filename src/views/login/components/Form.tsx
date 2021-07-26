import { useForm } from "react-hook-form"
import {
	Button,
	Group,
	Input,
	Label
} from "styles/elements"

export type FormDataType = {
	username: string,
	password: string
}

type FormType = {
	onSubmit: (data: FormDataType) => void;
}

const Form: React.FC<FormType> = ({ onSubmit: onSubmitProp }) => {

	const { register, handleSubmit } = useForm()

	const onSubmit = handleSubmit((data: FormDataType) => {
		onSubmitProp(data)
	})

	return (
		<form onSubmit={onSubmit}>

			<Group>
				<Label>Email</Label>
				<Input
					type="email"
					{...register('username', { required: true })}
				/>
			</Group>

			<Group>
				<Label>Password</Label>
				<Input
					type="password"
					{...register('password', { required: true })}
				/>
			</Group>

			<br />

			<Button>Login</Button>

		</form>
	)
}

export default Form