// // import "firebase-config"

// import { useState } from "react"
// import {
//   closestCenter,
//   DndContext,
//   DragEndEvent,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core"
// import {
//   arrayMove,
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
// import SortableNestedList from "./Test"

// function App() {
//   const [items, setItems] = useState<
//     {
//       id: string | number
//       name: string
//       subItems: { id: string | number; name: string }[]
//     }[]
//   >([
//     {
//       id: 1,
//       name: "item 1",
//       subItems: [
//         {
//           id: 1,
//           name: "sub item 1",
//         },
//         {
//           id: 2,
//           name: "sub item 2",
//         },
//         {
//           id: 3,
//           name: "sub item 3",
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "item 2",
//       subItems: [
//         {
//           id: 4,
//           name: "sub item 4",
//         },
//         {
//           id: 5,
//           name: "sub item 5",
//         },
//         {
//           id: 6,
//           name: "sub item 6",
//         },
//       ],
//     },
//   ])

//   const sensors = useSensors(useSensor(PointerSensor))
//   function handleDragEnd(event: DragEndEvent) {
//     const { active, over } = event
//     if (over && active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.map((item) => item.id).indexOf(active.id)
//         const newIndex = items.map((item) => item.id).indexOf(over.id)

//         return arrayMove(items, oldIndex, newIndex)
//       })
//     }
//   }

//   return (
//     <div
//       style={{
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <SortableNestedList />
//       <DndContext
//         onDragEnd={handleDragEnd}
//         collisionDetection={closestCenter}
//         modifiers={[restrictToVerticalAxis]}
//         sensors={sensors}
//       >
//         <SortableContext items={items} strategy={verticalListSortingStrategy}>
//           {items.map((item, i) => (
//             <Item key={item.id} item={item} idx={i} />
//           ))}
//         </SortableContext>
//       </DndContext>
//     </div>
//   )
// }

// export default App

// const Item = ({ item, idx }: { item: any; idx: number }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: item.id })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     margin: "1rem",
//     padding: "4px",
//     border: "1px solid white",
//     fontSize: "28px",
//   }
//   return (
//     <div ref={setNodeRef} style={style}>
//       <div>
//         <div {...listeners} {...attributes}>
//           {item.name}
//         </div>
//         <div>
//           <SortableContext items={item.subItems}>
//             {item.subItems.map((subItem: any, j: number) => (
//               <SubItem key={subItem.id} subItem={subItem} idx={j} />
//             ))}
//           </SortableContext>
//         </div>
//       </div>
//     </div>
//   )
// }

// const SubItem = ({ subItem, idx }: { subItem: any; idx: number }) => {
//   // const { attributes, listeners, setNodeRef, transform, transition } =
//   //   useSortable({ id: subItem.id })

//   // const style = {
//   //   transform: CSS.Transform.toString(transform),
//   //   transition,
//   // }
//   return (
//     <div>
//       <div>{subItem.name}</div>
//     </div>
//     // <div>
//     //   <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
//     //     {subItem.name}
//     //   </div>
//     // </div>
//   )
// }
