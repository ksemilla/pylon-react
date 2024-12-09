// import React from "react"
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
// import { SortableItem } from "./SortableItem"
// import { NestedSortableListProps } from "./types"

// export const NestedSortableList: React.FC<NestedSortableListProps> = ({
//   item,
// }) => {
//   return (
//     <div
//       style={{ marginBottom: "16px", border: "1px solid #ddd", padding: "8px" }}
//     >
//       <SortableItem id={item.id} name={item.name} />
//       <SortableContext
//         items={item.subitems.map((subitem) => subitem.id)}
//         strategy={verticalListSortingStrategy}
//       >
//         {item.subitems.map((subitem) => (
//           <SortableItem key={subitem.id} id={subitem.id} name={subitem.name} />
//         ))}
//       </SortableContext>
//     </div>
//   )
// }
