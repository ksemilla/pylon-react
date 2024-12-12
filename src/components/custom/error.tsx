import { OctagonXIcon } from "lucide-react"

interface ErrorMessage {
  title?: string
  messages?: string[]
}

export function ErrorMessage(props: ErrorMessage) {
  const { title, messages } = props
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="shrink-0">
          <OctagonXIcon aria-hidden="true" className="size-5 text-red-600" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {messages?.map((message, i) => (
                <li key={i}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
