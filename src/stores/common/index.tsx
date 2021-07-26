import React from 'react'
import { CommonStore } from "./CommonStore"

type CommonStoreContextValue = {
	commonStore: CommonStore
}

const CommonStoreContext = React.createContext<CommonStoreContextValue>({} as CommonStoreContextValue)

const commonStore = new CommonStore()

export const CommonProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
	return <CommonStoreContext.Provider value={{ commonStore }}>{children}</CommonStoreContext.Provider>
}

export const useCommonStore = () => React.useContext(CommonStoreContext)