import { create } from 'zustand'

interface AppState {
  isDeleteModalOpen: Boolean
  setIsDeleteModalOpen: (open: boolean) => void

  isRenameModalOpen: Boolean
  setIsRenameModalOpen: (open: boolean) => void

  fileId: string | null
  setFileId: (fileId: string) => void

  filename: string | null
  setFilename: (fileId: string) => void
}

export const useAppStore = create<AppState>()((set) => ({
  fileId: null,
  setFileId: (fileId: string) => set((state) => ({ fileId })),

  filename: "",
  setFilename: (filename: string) => set((state) => ({ filename })),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),


}))