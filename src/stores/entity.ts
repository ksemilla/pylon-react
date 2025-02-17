import { Entity } from "@/types/entity"
import { create } from "zustand"

interface EntityState {
  entityId: number | null
  entity: Entity | null

  setEntityId: (entityId: number) => void
  setEntity: (entity: Entity) => void
}

export const useEntityStore = create<EntityState>()((set) => ({
  entityId: null,
  entity: null,

  setEntityId: (entityId) => set((state) => ({ ...state, entityId })),
  setEntity: (entity) => set((state) => ({ ...state, entity })),
}))
