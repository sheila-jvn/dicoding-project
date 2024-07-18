function createImage(file: File) {
  const objectUrl = URL.createObjectURL(file)
  const img = new Image()
  img.src = objectUrl

  return img
}

export async function convertToImageData(file: File) {
  const img = createImage(file)

  await new Promise((resolve) => {
    img.onload = resolve
  })

  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")!

  canvas.width = img.width
  canvas.height = img.height

  context.drawImage(img, 0, 0)

  // Cleanup after drawing to avoid memory leaks
  URL.revokeObjectURL(img.src)

  const imageData = context.getImageData(0, 0, img.width, img.height)
  return imageData
}
