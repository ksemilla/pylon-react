import Form, { InventoryType } from "./Form"

const Add: React.FC = () => {

	const onSubmit = (data: InventoryType) => {
		console.log(data)
	}

	return (
		<div style={{width: "100%"}}>
			<h1>Create new Item</h1>
			<Form
				onSubmit={onSubmit}
			/>
		</div>
	)
}

export default Add