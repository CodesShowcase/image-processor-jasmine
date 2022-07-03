import { Request, Response } from 'express'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export class baseController {
	async showImages(req: Request, res: Response): Promise<void> {
		const file = req.query.file as string

		if (!file) {
			const dirPath = './images' as string
			const fileArr: string[] = []

			fs.readdir(dirPath, (err, files) => {
				files.forEach((element) => {
					if (path.extname(element) == '.jpg') {
						fileArr.push(' ' + element)
					}
				})

				res.status(200).send(`The following files are available: ${fileArr}`)

				if (err) {
					res.status(400).send('Could not scan directory')
				}
			})
		} else {
			try {
				const inFile = `./images/${file}.jpg` as string
				if (fs.existsSync(inFile)) {
					res.status(200).sendFile(inFile, { root: `${process.cwd()}` })
				} else {
					res.status(400).send('File does not exist')
				}
			} catch (err) {
				res.status(400).send(err)
			}
		}
	}

	async resizeImage(req: Request, res: Response): Promise<void> {
		const file = req.query.file as string
		const width = parseInt(req.query.width as string)
		const height = parseInt(req.query.height as string)

		const inFile = `./images/${file}.jpg` as string
		const outFile = `./images/resized/${file}-${width}-${height}.jpg` as string

		if (!file || !width || !height) {
			res
				.status(400)
				.send(
					'Parameters are missing => /api/resize?file=name&width=pixel&height=pixel',
				)
		} else {
			try {
				if (fs.existsSync(inFile)) {
					if (!fs.existsSync(outFile)) {
						fs.readFile(inFile, (err, data) => {
							sharp(data)
								.resize(width, height)
								.toFile(outFile)
								.then(() => {
									res
										.status(200)
										.sendFile(outFile, { root: `${process.cwd()}` })
								})
							console.log('The file was resized')
						})
					} else {
						res.status(200).sendFile(outFile, { root: `${process.cwd()}` })
						console.log('The file already exists')
					}
				} else {
					res.status(400).send('Sourcefile does not exist')
				}
			} catch (err) {
				res.status(400).send(err)
			}
		}
	}

	async greyscaleImage(req: Request, res: Response): Promise<void> {
		const file = req.query.file as string

		const inFile = `./images/${file}.jpg` as string
		const outFile = `./images/greyscaled/${file}.jpg` as string

		if (!file) {
			res.status(400).send('Parameters are missing => /api/greyscale?file=name')
		} else {
			try {
				if (fs.existsSync(inFile)) {
					if (!fs.existsSync(outFile)) {
						fs.readFile(inFile, (err, data) => {
							sharp(data)
								.greyscale()
								.toFile(outFile)
								.then(() => {
									res
										.status(200)
										.sendFile(outFile, { root: `${process.cwd()}` })
								})
							console.log('The file was greyscaled')
						})
					} else {
						res.status(200).sendFile(outFile, { root: `${process.cwd()}` })
						console.log('The file already exists')
					}
				} else {
					res.status(400).send('Sourcefile does not exist')
				}
			} catch (err) {
				res.status(400).send(err)
			}
		}
	}
}

export default new baseController()
