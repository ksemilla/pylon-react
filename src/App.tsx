import { observer } from 'mobx-react-lite'

import Routes from "routes"

import { getInventory } from 'api/inventory'
import { getVendors } from 'api/vendors'
import { useEffect } from 'react'

import { useAuthStore } from 'stores/auth';
import { useCommonStore } from 'stores/common';

const App = () => {

	const authContext = useAuthStore()
	const authStore = authContext.authStore

	const commonContext = useCommonStore()
	const commonStore = commonContext.commonStore

	useEffect(()=>{
		if (authStore.isLogged) {

			getInventory()
			.then(res=>{
				commonStore.setInventory(res.data)
			})
			.catch(res=>{
				console.log("[ERROR][APP.TSX]", res.response)
			})

			getVendors()
			.then(res=>{
				commonStore.setVendors(res.data)
			})
			.catch(res=>{
				console.log("[ERROR][APP.TSX]", res.response)
			})

		}
	}, [authStore.isLogged, commonStore])

  return (
		<div style={{minHeight: "100vh", display: "flex"}}>
			<div style={{overflow: "hidden", flex: 1}}>
				<Routes />
			</div>
		</div>
  );
}

export default observer(App)
