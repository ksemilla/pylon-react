export interface Entity {
  id?: number
  name: string
  slug: string
  photo?: FileList
  icon?: FileList

  isActive?: boolean
}
