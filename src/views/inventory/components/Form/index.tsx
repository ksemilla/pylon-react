import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import GeneralInfoForm from "./GeneralInfoForm"
import StockForm from "./StockInfoForm"
import LaborForm from "./LaborInfoForm"

import {
	Group,
	Row,
	Label,
	// Input, 
	Select,
	Button,
} from "styles/elements"

export type InventoryType = {
	id?: number,
	type: string,
	name: string,
	part_number: string,
	description: string,
	stock: number,
}

type FormType = {
	onSubmit: (data: InventoryType) => void,
	initialValues?: InventoryType
}

const Form: React.FC<FormType> = ({ onSubmit: onSubmitProp, initialValues }) => {

	const methods = useForm<InventoryType>({
		defaultValues: initialValues ? initialValues : {
			
		}
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
						<Label>Type</Label>
						<Select
							{...methods.register('type', {required: true})}
							onChange={e=>setView(e.target.value)}
						>
							<option value="stock">Stock</option>
							<option value="labor">Labor</option>
							<option value="assembly">Assembly</option>
							<option value="document">Document</option>
						</Select>
					</Group>
				</Row>

				<GeneralInfoForm />

				{view === "stock" && <StockForm />}
				{view === "labor" && <LaborForm />}

				<Button>Submit</Button>

			</form>
		</FormProvider>
	)
}

export default Form