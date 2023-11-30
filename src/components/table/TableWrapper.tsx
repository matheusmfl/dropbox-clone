
'use client'
import React, { useState } from 'react'
import { FileType } from '../../../typings'
import { Button } from '../ui/button'
import { DataTable } from './Table'
import { columns } from './Columns'
import { useUser } from '@clerk/nextjs'

function TableWrapper(
  { skeletonFiles }: { skeletonFiles: FileType[] }
) {
  const { user } = useUser()
  const [initialFiles, setInitialFiles] = useState<FileType[]>([])
  const [sort, setSort] = useState<"asc" | "desc">("desc")


  return (
    <div>
      {/* button */}
      <Button onClick={() => setSort(sort === 'desc' ? 'asc' : 'desc')}>
        Filtrar por {sort === 'desc' ? "Mais novo" : "Mais antigo"}
      </Button>

      <DataTable columns={columns} data={skeletonFiles} />
    </div>
  )
}

export default TableWrapper