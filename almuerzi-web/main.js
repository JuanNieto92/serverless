const stringToHtml = (s) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(s, 'text/html')
  return doc.body.firstChild
}

const renderItem = (item) =>{
  return stringToHtml(`<li data-id="${item._id}">${item.name}</li>`)
}

window.onload = () => {
  fetch('https://serverless-juannieto92.vercel.app/api/meals')
    .then(response => response.json())
    .then(data => {
      const mealsList = document.getElementById('meals-list')
      const submit = document.getElementById('submit')
      const listItems = data.map(renderItem)
      listItems.forEach(element => mealsList.appendChild(element))
      submit.removeAttribute('disabled')
    })
}