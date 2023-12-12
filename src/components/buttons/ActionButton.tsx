import { classNames } from "@/lib/utils"
import { useEffect, useState } from "react"

type ActionButtonProps = {
  children?: React.ReactNode
}

const ActionButton = (props: ActionButtonProps) => {
  const [pos, setPos] = useState("translate-y-0")

  const [isMouseHeld, setIsMouseHeld] = useState(false)
  const handleMouseDown = () => {
    setIsMouseHeld(true)
    setPos("translate-y-0.5")
  }

  const handleMouseUp = () => {
    setIsMouseHeld(false)
    setPos("translate-y-0")
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    // document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      // document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMouseHeld])

  return (
    <div
      onMouseDown={handleMouseDown}
      className={classNames("relative duration-75 transition", pos)}
    >
      {props.children}
    </div>
  )
}

export { ActionButton }
