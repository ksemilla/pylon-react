export type Vendor = {
    id?: number
    name: string
    code: string
    notes?: string
    vendorContacts?: VendorContact[]
}

export type VendorContact = {
    id?: number
    name: string
    email?: string
    mobile?: string
    phone?: string
    notes?: string
}