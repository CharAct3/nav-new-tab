const titleElement = document.getElementById('title')
const urlElement = document.getElementById('url')
const faviconElement = document.getElementById('favicon')
const categoryElement = document.getElementById('category')
const form = document.getElementById('form')

chrome.storage.local.get('groups', ({groups}) => {
  for (let category of groups) {
    let node = document.createElement('option')
    node.value = category.name
    node.textContent = category.name
    categoryElement.appendChild(node)
  }
})

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  titleElement.value = tabs[0].title
  urlElement.value = tabs[0].url
  faviconElement.value = tabs[0].favIconUrl
})

form.onsubmit = function addIngress(e) {
  e.preventDefault()
  const form = e.target
  const newIngress = {
    name: form.title.value,
    href: form.url.value,
    img: form.favicon.value,
  }
  fetch(form.favicon.value)
    .then(resp => resp.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (_e) => {
        resolve(_e.target.result)
      }
      reader.onerror = (_e) => {
        reject(_e)
      }
      reader.readAsDataURL(blob)
    }))
    .then(img => {
      newIngress.img = img
    })
    .catch(error => {
      console.log(error)
      newIngress.img = null
    })
    .then(() => addIngressToStorage(newIngress))
}

function addIngressToStorage(ingress) {
  chrome.storage.local.get('groups', ({groups}) => {
    groups.map(group => {
      if (group.name === form.category.value) {
        group.ingresses.push(ingress)
      }
    })
    chrome.storage.local.set({groups: groups}, () => {
      window.close()
    })
  })
}
