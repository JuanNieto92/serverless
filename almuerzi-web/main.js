window.onload = () => {
  fetch('https://serverless-juannieto92.vercel.app/api/meals')
    .then(response => response.json())
    .then(data => console.log(data))
}