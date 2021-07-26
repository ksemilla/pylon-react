import { observable, action } from 'mobx'

export type VendorAddressType = {
	id: number,
	is_primary: boolean,
	address1: string,
	address2: string,
	city: string,
	state: string,
	country: string,
	postal_code: string
}

export type VendorContactType = {
	id: number,
	name: string,
	phone: string,
	email: string
}

export type VendorType = {
	id: number,
	status: string,
	code: string,
	name: string,
	email: string,
	phone: string,
	contacts: VendorContactType[],
	addresses: VendorAddressType[]
}

export type StockInstanceType = {
	id: number,
	description: string,
	quantity: number,
	location: string,
	photo: string
}

export type StockType = {
	id: number,
	status: string,
	part_number: string,
	name: string,
	description: string,
	unit: string,
	quantity: number,
	list_price: number,
	sell_price: number,
	location: string,
	photo: string,
	vendors: VendorType[],
	instances: StockInstanceType[]
}

export type LaborType = {
	id: number,
	status: string,
	part_number: string,
	name: string,
	description: string,
	unit: string,
	list_price: number,
	sell_price: number,
	photo: string
}

export type DocumentType = {
	id: number,
	status: string,
	part_number: string,
	name: string,
	description: string,
	unit: string,
	list_price: number,
	sell_price: number,
	photo: string,
	file: string
}

export type AssemblyItemType = {
	id: string,
	order: number,
	type: string,
	stock?: StockType,
	labor?: LaborType,
	document: DocumentType,
	quantity: number,
	list_price: number,
	sell_price: number
}

export type AssemblyType = {
	id: number,
	status: string,
	part_number: string,
	name: string,
	description: string,
	unit: string,
	items: AssemblyItemType[]
}

export class CommonStore {
	@observable inventory: (StockType|LaborType|DocumentType|AssemblyType)[] = []
	@observable vendors: VendorType[] = []

	@action
	setInventory = (data: (StockType|LaborType|DocumentType|AssemblyType)[]) => {
		this.inventory = data
	}

	@action
	setVendors = (data: VendorType[]) => {
		this.vendors = data
	}

}