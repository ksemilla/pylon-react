export type SubItem = {
  id: string
  name: string
}

export type Item = {
  id: string
  name: string
  subitems: SubItem[]
}

export type SortableItemProps = {
  id: string
  name: string
}

export type NestedSortableListProps = {
  item: Item
}
