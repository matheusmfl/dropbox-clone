import React from 'react'
import { FileType } from '../../../typings'
import { Button } from '../ui/button'

function TableWrapper(
  { skeletonFiles }: { skeletonFiles: FileType[] }
) {
  return (
    <div>
      {/* button */}
      <Button>
        Filtrar por...
      </Button>
    </div>
  )
}

export default TableWrapper