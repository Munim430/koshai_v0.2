export async function compressImage(file: File, maxSize: number = 800000): Promise<Blob> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calculate new dimensions while maintaining aspect ratio
        const ratio = width / height
        const maxWidth = 1200
        const maxHeight = 1200

        if (width > maxWidth) {
          width = maxWidth
          height = width / ratio
        }
        if (height > maxHeight) {
          height = maxHeight
          width = height * ratio
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          canvas.toBlob((blob) => {
            if (blob && blob.size > maxSize) {
              // Recursively compress if still too large
              compressImage(new File([blob], file.name), maxSize).then(resolve)
            } else {
              resolve(blob || file)
            }
          }, 'image/jpeg', 0.7)
        }
      }
    }
  })
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function calculateFeeForListing(count: number, freeLimit: number): number {
  if (count < freeLimit) return 0
  const extraListings = count - freeLimit
  // Example: 2% fee per extra listing (adjust as needed)
  return Math.ceil(extraListings * 0.02 * 1000) // Assuming base price ~1000 BDT
}
