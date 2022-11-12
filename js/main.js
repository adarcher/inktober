document.addEventListener('DOMContentLoaded', e => {
  let image = document.getElementById('image')
  let thumbnail_picker = document.getElementById('thumbnails')
  let thumbnails = document.getElementById('thumbnail-frame')

  function HideThumbnails() {
    thumbnail_picker.style.display = 'none'
  }

  function ShowThumbnails() {
    thumbnail_picker.style.display = 'block'
  }

  function ShowImage(img) {
    image.style.backgroundImage = img
    HideThumbnails()
  }

  let current = 1
  const max = 31
  function IncCurrent(i) {
    current = ((current - 1 + max + i) % max) + 1
    return current
  }

  function ImagePath(i) {
    return `./images/Inktober_2022-${i.toString().padStart(2, '0')}.png`
  }
  function ImageSrc(i) {
    return `url(${ImagePath(i)})`
  }

  function Next() {
    ShowImage(ImageSrc(IncCurrent(1)))
  }

  function Previous() {
    ShowImage(ImageSrc(IncCurrent(-1)))
  }

  let next_img = document.getElementById('forward')
  let prev_img = document.getElementById('back')
  let gallery = document.getElementById('select')

  next_img.onclick = e => {
    Next()
  }

  prev_img.onclick = e => {
    Previous()
  }

  gallery.onclick = e => {
    ShowThumbnails()
  }

  ShowImage(ImageSrc(1))

  for (var i = 1; i <= 31; i++) {
    var thumbnail = document.createElement('div')
    thumbnail.className = 'thumbnail'
    thumbnail.style.backgroundImage = ImageSrc(i)

    thumbnail.onclick = e => {
      let img = e.currentTarget.style.backgroundImage
      ShowImage(img)
    }

    let tmp = document.createElement('img')
    tmp.src = ImagePath(i)

    thumbnails.appendChild(thumbnail)
  }
})
