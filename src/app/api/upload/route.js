import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    
    await writeFile(join(uploadDir, fileName), buffer)
    
    return Response.json({ 
      success: true, 
      url: `/uploads/${fileName}`,
      fileName: fileName
    })
  } catch (error) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}