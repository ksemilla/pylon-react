import Table from "@/components/data-display/Table"
import { useNavigate } from "react-router-dom"

export function VendorList() {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        Vendors
      </h1>
      <Table
        headers={[
          { label: "Name", field: "name" },
          { label: "Title", field: "title" },
          { label: "Email", field: "email" },
          { label: "Role", field: "role" },
        ]}
        data={[
          {
            name: "Lindsay Walton",
            title: "Front-end Developer",
            email: "lindsay.walton@example.com",
            role: "Member",
          },
          {
            name: "Test",
            title: "test",
            email: "test",
            role: "test",
          },
        ]}
        onRowClick={(obj: Record<any, any>) => {
          navigate(`${obj.id}`)
        }}
      />
    </div>
  )
}
