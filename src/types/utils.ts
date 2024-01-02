export enum SizeType {
  XXS = "xxs",
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "xxl",
  XXXL = "xxxl",
}

export type AddressType = {
  id?: number
  address1: string
  address2?: string
  street: string
  city: string
  state: string
  country?: string
  zipCode?: string
}
