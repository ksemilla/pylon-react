import { Link } from "react-router-dom"

export function HomePage() {
  return (
    <div>
      Home page <Link to="/login">Login</Link>
    </div>
  )
}
