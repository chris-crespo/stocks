import React, { ReactNode } from "react"
import { Filter, TId } from "~/types"

type OnlyField<Entry> = {
  field: keyof Filter<Entry, ReactNode>
  Cell?: never
}

type OnlyCell<Entry> = {
  field?: never
  Cell: React.FC<{ entry: Entry }>
}

type FieldOrCell<Entry> = OnlyCell<Entry> | OnlyField<Entry>

type TableColumn<Entry> = FieldOrCell<Entry> & {
  title: string;
  align?: 'left' | 'right';
}

type Props<Entry extends {}> = {
  columns: TableColumn<Entry>[]
  data: Entry[]
}

const Table = <Entry extends {
  id: TId,
  [k: string]: unknown
}>({ columns, data }: Props<Entry>) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {columns.map(({ title, align = 'left' }) => (
              <th
                key={title}
                className={`px-8 py-2 text-${align} text-sm`}
                scope="col"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(entry => (
            <tr
              key={entry.id}
              className="border-b hover:bg-gray-100"
            >
              {columns.map(({ title, align = 'left', ...column }) => (
                <td key={title} className={`px-8 py-4 text-${align}`}>
                  {column.Cell ? <column.Cell entry={entry} /> : entry[column.field] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
