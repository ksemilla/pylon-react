import { observer } from "mobx-react-lite"
import { useCommonStore } from "stores/common"
import { Container } from "styles/containers"
import Inline from "./components/Inline"



const List: React.FC = () => {

	const commonContext = useCommonStore()
	const commonStore = commonContext.commonStore

	return (
		<Container padding="5px 0px">
			{commonStore.inventory.map(inventory => <Inline key={inventory.id} inventory={inventory} /> )}
		</Container>
	)
}

export default observer(List)