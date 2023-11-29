import { Card } from "@/components/data-display/Card"
import { Input } from "@/components/inputs/Input"
import { Mail } from "lucide-react"

export function LoginPage() {
  return (
    <div className="text-xl">
      <Card>
        <Input
          leftSection={
            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
          }
        />
      </Card>
    </div>
  )
}
