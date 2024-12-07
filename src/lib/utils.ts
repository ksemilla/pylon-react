import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type AnyObject = { [key: string]: any }

/**
 * Converts camelCase keys of an object to snake_case.
 * @param obj - The input object with camelCase keys.
 * @returns A new object with snake_case keys.
 */
export function camelToSnakeCase(obj: AnyObject): AnyObject {
  const toSnakeCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()

  if (Array.isArray(obj)) {
    // If the object is an array, recursively process each item.
    return obj.map((item) =>
      typeof item === "object" ? camelToSnakeCase(item) : item
    )
  }

  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    // If the object is a plain object, transform its keys.
    return Object.keys(obj).reduce((acc: AnyObject, key: string) => {
      const newKey = toSnakeCase(key)
      const value = obj[key]
      acc[newKey] = typeof value === "object" ? camelToSnakeCase(value) : value
      return acc
    }, {})
  }

  // If it's not an object or array, return as is.
  return obj
}

export function snakeToCamelCase(obj: AnyObject): AnyObject {
  // Helper to convert snake_case string to camelCase
  const toCamelCase = (str: string): string =>
    str.replace(/_([a-z])/g, (_, char) => char.toUpperCase())

  if (Array.isArray(obj)) {
    // Process each element in an array recursively
    return obj.map((item) =>
      typeof item === "object" && item !== null ? snakeToCamelCase(item) : item
    )
  }

  if (obj && typeof obj === "object" && obj !== null) {
    // Process keys for plain objects
    return Object.keys(obj).reduce((acc: AnyObject, key: string) => {
      const newKey = toCamelCase(key)
      const value = obj[key]
      acc[newKey] =
        typeof value === "object" && value !== null
          ? snakeToCamelCase(value)
          : value
      return acc
    }, {})
  }

  // Return non-object types as-is
  return obj
}

type JwtDecoded = {
  header: object
  payload: object
}

export function parseJwt(token: string): JwtDecoded | null {
  // Split the JWT into three parts (header, payload, signature)
  const parts = token.split(".")

  // If the token doesn't have exactly 3 parts, it's invalid
  if (parts.length !== 3) {
    console.error("Invalid JWT token")
    return null
  }

  // Decode the header and payload from Base64Url
  const decodeBase64Url = (base64Url: string): string => {
    // Replace Base64Url characters with Base64 standard characters
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    // Add padding if necessary
    base64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
    return atob(base64)
  }

  try {
    // Decode the header and payload parts
    const header = JSON.parse(decodeBase64Url(parts[0]))
    const payload = JSON.parse(decodeBase64Url(parts[1]))

    return { header, payload }
  } catch (e) {
    console.error("Error parsing JWT:", e)
    return null
  }
}
