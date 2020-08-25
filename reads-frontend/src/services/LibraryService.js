const getBooks = (author) => {
  const authorString = author.split(' ').join('+')
  return fetch(`/library?author=${authorString}`)
    .then(response => response.json())
}

export default {
  getBooks
}
