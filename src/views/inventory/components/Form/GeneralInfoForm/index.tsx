import { useFormContext } from "react-hook-form"
import {
	Row,
	Group,
	Label,
	Input
} from "styles/elements"

const GeneralForm: React.FC = () => {

	const { register } = useFormContext()

	return (
		<div>
			<Row>
				<Group>
					<Label>Part Number</Label>
					<Input
						{...register('part_number', {required: true})}
					/>
				</Group>

				<Group>
					<Label>Name</Label>
					<Input
						{...register('name', {required: true})}
					/>
				</Group>
			</Row>

			<Row>
				<Group>
					
				</Group>
			</Row>
		</div>
	)
}

export default GeneralForm