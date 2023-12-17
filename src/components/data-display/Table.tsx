import { classNames } from "@/lib/utils"

type TableProps = {
  headers: {
    label: string
    field: string
  }[]
  data: Record<any, any>[]
  onRowClick?: (d: Record<any, any>) => void
}

export default function Table(props: TableProps) {
  return (
    <div className="mt-2 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr>
                {props.headers.map((h, i) => (
                  <th
                    scope="col"
                    className={classNames(
                      "text-left text-sm font-semibold",
                      i === 0 ? "py-3.5 pl-4 pr-3 sm:pl-1" : "px-3 py-3.5 "
                    )}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {props.data.map((d, i) => (
                <tr
                  onClick={() => {
                    if (props.onRowClick) {
                      props.onRowClick(d)
                    }
                  }}
                  key={i}
                  className={classNames(
                    !!props.onRowClick
                      ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      : ""
                  )}
                >
                  {props.headers.map((h, j) => (
                    <td
                      key={j}
                      className={classNames(
                        "whitespace-nowrap text-sm",
                        j === 0
                          ? "py-4 pl-4 pr-3 sm:pl-1 font-medium"
                          : "px-3 py-4 text-gray-500"
                      )}
                    >
                      {[d[h.field]]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
