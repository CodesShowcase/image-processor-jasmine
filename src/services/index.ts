import sharp from 'sharp'
import fs from 'fs'

export async function greyscaleSharp(inFile: string, outFile: string): Promise<string> {
  await sharp(inFile)
    .greyscale()
    .toFile(outFile)
  if (fs.existsSync(outFile)) {
		return outFile
	} else {
		return 'Error'
	}
}

export async function resizeSharp(inFile: string, outFile: string, width: number, height: number): Promise<string> {
  await sharp(inFile)
    .resize(width, height)
    .toFile(outFile)
  if (fs.existsSync(outFile)) {
		return outFile
	} else {
		return 'Error'
	}
}
