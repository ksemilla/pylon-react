import { Group, Input, Label, Row } from "styles/elements"
import { useFormContext } from "react-hook-form"

type ContactFormType = {
	contact: {
		uuid: string,
		id?: number,
	},
	idx: number
}

const ContactForm: React.FC<ContactFormType> = ({ idx }) => {

	const { register } = useFormContext()

	return (
		<Row>
			<Group>
				<Label>Name</Label>
				<Input
					{...register(`contacts[${idx}].name`, {required: true})}
				/>
			</Group>
			<Group>
				<Label>Phone</Label>
				<Input
					{...register(`contacts[${idx}].phone`)}
				/>
			</Group>
			<Group>
				<Label>Email</Label>
				<Input
					{...register(`contacts[${idx}].email`)}
				/>
			</Group>
		</Row>
	)
}

export default ContactForm