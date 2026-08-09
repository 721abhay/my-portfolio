import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Resolve path to lib/portfolio-data.json
    const filePath = path.join(process.cwd(), "lib", "portfolio-data.json")

    // Attempt to write to the local file
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
      return NextResponse.json({ success: true })
    } catch (fsError: any) {
      console.warn("Failed to write to local filesystem (likely production read-only filesystem):", fsError.message)
      return NextResponse.json(
        { 
          success: false, 
          isReadOnly: true, 
          message: "Filesystem is read-only. Changes saved in browser session." 
        },
        { status: 200 } // Return 200 so frontend knows it saved to localStorage and is read-only
      )
    }
  } catch (error: any) {
    console.error("API admin update route failed:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Unknown error occurred" },
      { status: 500 }
    )
  }
}
