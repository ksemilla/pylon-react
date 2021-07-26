import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import {
	Row,
	Group,
	Label,
	Input
} from "styles/elements"

const LaborForm: React.FC = () => {

	const { register, unregister } = useFormContext()

	useEffect(()=>{
		return () => {
			unregister('labor')
		}
	}, [unregister])

	return (
		<div>
			<Row>
				<Group>
					<Label>labor Field</Label>
					<Input
						{...register('labor', {required: true})}
					/>
				</Group>

				{/* <Group>
					<Label>Name</Label>
					<Input
						{...register('name', {required: true})}
					/>
				</Group> */}
			</Row>

			<Row>
				<Group>
					
				</Group>
			</Row>
		</div>
	)
}

export default LaborForm