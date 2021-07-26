import { useState } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"

import {
	VendorType
} from "stores/common/CommonStore"

import {
	Group,
	Row,
	Label,
	Select,
	Button,
	Input,
} from "styles/elements"
import ContactForm from "./components/ContactForm"

type FormType = {
	onSubmit: (data: VendorType) => void,
	initialValues?: VendorType
}

const Form: React.FC<FormType> = ({ onSubmit: onSubmitProp, initialValues }) => {

	const methods = useForm<VendorType>({
		defaultValues: initialValues ? initialValues : {
			contacts: [
				{
					name: "",
					phone: "",
					email: ""
				}
			]
		}
	})

	const { fields: contacts, append, remove } = useFieldArray({
		control: methods.control,
		name: 'contacts',
		keyName: 'uuid'
	})

	const [view, setView] = useState<string>("stock")

	const onSubmit = methods.handleSubmit((data)=>{
		onSubmitProp(data)
	})

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit}>

				<Row>
					<Group>
						<Label>Status</Label>
						<Select
							{...methods.register('status', {required: true})}
						>
							<option value="a">Active</option>
							<option value="i">Inactive</option>
						</Select>
					</Group>
				</Row>

				<Row>
					<Group>
						<Label>Code</Label>
						<Input
							{...methods.register('code', {required: true})}
						>
						</Input>
					</Group>
					<Group>
						<Label>Name</Label>
						<Input
							{...methods.register('name', {required: true})}
						>
						</Input>
					</Group>
				</Row>

				<Row>
					<Group>
						<Label>Email</Label>
						<Input
							type="email"
							{...methods.register('email')}
						>
						</Input>
					</Group>
					<Group>
						<Label>Phone</Label>
						<Input
							{...methods.register('phone')}
						>
						</Input>
					</Group>
				</Row>

				<Label>Contacts</Label>
				{contacts.map((contact, idx)=> <ContactForm key={contact.uuid} contact={contact} idx={idx}/>)}

				<Button>Submit</Button>

			</form>
		</FormProvider>
	)
}

export default Form