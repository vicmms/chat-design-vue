export class DecoratedFile {
  name = null
  size = null
  type = null
  ext = null
  url = null
  videoThumbnail = null
  imageColor = null

  constructor(dataFile) {
    this.name = dataFile.filename ? `${dataFile.filename}.${dataFile.ext}` : `file.${dataFile.ext}`
    this.size = parseInt(dataFile.size) || 561813
    this.type = dataFile.mimetype || ''
    this.ext = dataFile.ext || ''
    this.url = dataFile.file || ''
    this.videoThumbnail = dataFile.thumbnail || ''
    this.imageColor = dataFile.ext === 'pdf' ? null : [66, 62, 45]
  }

  serialize() {
    return {
      name: this.name,
      size: this.size,
      type: this.type,
      ext: this.ext,
      url: this.url,
      videoThumbnail: this.videoThumbnail,
      imageColor: this.imageColor,
    }
  }
}