'use client'

import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"

export function RenameModal() {
  const { user } = useUser()
  const [input, setInput] = useState('')

  const [isRenameModalOpen, setIsRenameModalOpen, filename, fileId] = useAppStore((state) =>
    [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.filename,
      state.fileId

    ])

  async function renameFile() {
    if (!user || !fileId) return

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input
    })

    setInput("")

    setIsRenameModalOpen(false)
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {

        setIsRenameModalOpen(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Renomear arquivo</DialogTitle>
          <Input id="link" defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter') {
                renameFile()
              }
            }} />


          <div className="flex space-x-2 py-3">

            <Button size={'sm'} className="px-3" variant={'ghost'} onClick={() => setIsRenameModalOpen(false)}>
              <span className="sr-only">
                Cancelar
              </span>
              <span>
                Cancelar
              </span>
            </Button>

            <Button type="submit" size={'sm'} className="px-3 flex-1" onClick={() => renameFile()}>
              <span className="sr-only">
                Renomear
              </span>
              <span>
                Renomear
              </span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

