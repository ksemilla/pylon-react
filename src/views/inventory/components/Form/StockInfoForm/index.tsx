import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import {
	Row,
	Group,
	Label,
	Input
} from "styles/elements"

const StockForm: React.FC = () => {

	const { register, unregister } = useFormContext()

	useEffect(()=>{
		return () => {
			unregister('stocks')
		}
	}, [unregister])

	return (
		<div>
			<Row>
				<Group>
					<Label>Stock Field</Label>
					<Input
						{...register('stocks', {required: true})}
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

export default StockForm