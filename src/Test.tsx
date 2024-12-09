// import React, { useState } from "react"
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragStartEvent,
//   DragEndEvent,
//   DragOverlay,
// } from "@dnd-kit/core"
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable"
// import { NestedSortableList } from "./NestedSortableList"
// import { Item } from "./types"

// const SortableNestedList: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([
//     {
//       id: "1",
//       name: "Parent 1",
//       subitems: [
//         { id: "1-1", name: "Subitem 1-1" },
//         { id: "1-2", name: "Subitem 1-2" },
//       ],
//     },
//     {
//       id: "2",
//       name: "Parent 2",
//       subitems: [
//         { id: "2-1", name: "Subitem 2-1" },
//         { id: "2-2", name: "Subitem 2-2" },
//       ],
//     },
//     { id: "3", name: "Parent 3", subitems: [] },
//   ])

//   // const [activeId, setActiveId] = useState<string | null>(null)
//   const sensors = useSensors(useSensor(PointerSensor))

//   const handleDragStart = (event: DragStartEvent) => {
//     // setActiveId(event.active.id as string)
//   }

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event

//     if (!over) {
//       // setActiveId(null)
//       return
//     }

//     setItems((prev) => {
//       // Handle parent-level sorting
//       const activeParentIndex = prev.findIndex((item) => item.id === active.id)
//       const overParentIndex = prev.findIndex((item) => item.id === over.id)

//       if (activeParentIndex !== -1 && overParentIndex !== -1) {
//         return arrayMove(prev, activeParentIndex, overParentIndex)
//       }

//       // Handle subitem-level reordering or movement
//       const activeParent = prev.find((item) =>
//         item.subitems.some((sub) => sub.id === active.id)
//       )
//       const overParent = prev.find((item) =>
//         item.subitems.some((sub) => sub.id === over.id)
//       )

//       if (activeParent && overParent) {
//         const activeSubIndex = activeParent.subitems.findIndex(
//           (sub) => sub.id === active.id
//         )
//         const overSubIndex = overParent.subitems.findIndex(
//           (sub) => sub.id === over.id
//         )

//         if (activeParent === overParent) {
//           // Sort within the same parent
//           activeParent.subitems = arrayMove(
//             activeParent.subitems,
//             activeSubIndex,
//             overSubIndex
//           )
//         } else {
//           // Move subitem to another parent
//           const [movedSubitem] = activeParent.subitems.splice(activeSubIndex, 1)
//           overParent.subitems.splice(overSubIndex + 1, 0, movedSubitem)
//         }
//       }

//       return [...prev]
//     })

//     // setActiveId(null)
//   }

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       // onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//     >
//       <SortableContext
//         items={items.map((item) => item.id)}
//         strategy={verticalListSortingStrategy}
//       >
//         {items.map((item) => (
//           <NestedSortableList key={item.id} item={item} />
//         ))}
//       </SortableContext>

//       {/* <DragOverlay>
//         {activeId ? (
//           <div
//             style={{
//               padding: "8px",
//               background: "#f0f0f0",
//               border: "1px solid #ccc",
//             }}
//           >
//             {activeId}
//           </div>
//         ) : null}
//       </DragOverlay> */}
//     </DndContext>
//   )
// }

// export default SortableNestedList
