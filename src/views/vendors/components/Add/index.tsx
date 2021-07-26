import Form from "../Form"
import {
	VendorType
} from "stores/common/CommonStore"

const Add: React.FC = () => {

	const onSubmit = (data: VendorType) => {
		console.log(data)
	}

	return (
		<div style={{width: "100%"}}>
			<h1>Create new Vendor</h1>
			<Form
				onSubmit={onSubmit}
			/>
		</div>
	)
}

export default Add