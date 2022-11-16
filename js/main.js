document.addEventListener('DOMContentLoaded', e => {
  let current = 1
  let show_description = 'SHOW INFO'
  let hide_description = 'HIDE'
  let frame = document.getElementById('frame')
  let image = document.getElementById('image')
  let thumbnail_picker = document.getElementById('thumbnails')
  let thumbnails = document.getElementById('thumbnail-frame')
  let annotations = document.getElementById('annotations')
  let title = document.getElementById('title')
  let description = document.getElementById('description')
  let hide_me = document.getElementById('hide_me')

  let SetInfo = i => {
    if (typeof info !== 'undefined' && info[i]) {
      var img_info = info[i]
      title.textContent = `${i.toString().padStart(2, '0')} ${img_info.title}`
      description.textContent = img_info.description
      return true
    } else {
      title.textContent = ''
      description.textContent = ''
      HideAnnotations()
    }
    return false
  }

  let HideAnnotations = () => {
    title.style.display = 'none'
    description.style.display = 'none'
    hide_me.textContent = show_description
  }
  let ShowAnnotations = () => {
    if (SetInfo(current)) {
      title.style.display = 'inline-block'
      description.style.display = 'inline-block'
      hide_me.textContent = hide_description
    }
  }

  HideAnnotations()

  frame.onclick = e => {
    if (title.style.display == 'none') {
      ShowAnnotations()
    } else {
      HideAnnotations()
    }
  }

  let HideThumbnails = () => {
    thumbnail_picker.style.display = 'none'
  }

  let ShowThumbnails = () => {
    thumbnail_picker.style.display = 'block'
  }

  let ShowImage = img => {
    image.style.backgroundImage = img
    SetInfo(current)
    HideThumbnails()
  }

  const max = 31
  let IncCurrent = i => {
    current = ((current - 1 + max + i) % max) + 1
    return current
  }

  let ImagePath = i => {
    return `./images/Inktober_2022-${i.toString().padStart(2, '0')}.png`
  }
  let ImageSrc = i => {
    return `url(${ImagePath(i)})`
  }

  let Next = () => {
    ShowImage(ImageSrc(IncCurrent(1)))
  }

  let Previous = () => {
    ShowImage(ImageSrc(IncCurrent(-1)))
  }

  let next_img = document.getElementById('forward')
  let prev_img = document.getElementById('back')
  let gallery = document.getElementById('select')

  next_img.onclick = e => {
    Next()
    e.stopImmediatePropagation()
  }

  prev_img.onclick = e => {
    Previous()
    e.stopImmediatePropagation()
  }

  gallery.onclick = e => {
    ShowThumbnails()
    e.stopImmediatePropagation()
  }

  ShowImage(ImageSrc(1))

  for (var i = 1; i <= 31; i++) {
    let thumbnail = document.createElement('div')
    let index = i
    thumbnail.className = 'thumbnail'
    thumbnail.index = index
    thumbnail.style.backgroundImage = ImageSrc(i)

    thumbnail.onclick = e => {
      current = e.currentTarget.index
      let img = e.currentTarget.style.backgroundImage
      ShowImage(img)
    }

    let tmp = document.createElement('img')
    tmp.src = ImagePath(i)

    thumbnails.appendChild(thumbnail)
  }
})
