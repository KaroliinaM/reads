const express=require('express')
const {checkHeaders} =require('./middleware')

const app=express()
const port=3002
const books=require('./books')
const {recommendations}=require('./recommendations')
app.use(express.json())



const res={
    "result": "success",
    "user": {
      "taste_test": [
        {
          "author": "F. Scott Fitzgerald",
          "author_language": "en",
          "cover": "https:\/\/www.readgeek.com\/images\/cover\/.tmb\/thumb_9780743273565-L_175_300.jpg",
          "readgeekid": 9445914,
          "title": "The Great Gatsby",
          "title_language": "en"
        },
        {
          "author": "Jerome D. Salinger",
          "author_language": "en",
          "cover": "https:\/\/www.readgeek.com\/images\/cover\/.tmb\/thumb_0877547165-L_175_300.jpg",
          "readgeekid": 14793539,
          "title": "The Catcher in the Rye",
          "title_language": "en"
        },
        {
          "author": "Stephenie Meyer",
          "author_language": "en",
          "cover": "https:\/\/www.readgeek.com\/images\/cover\/.tmb\/thumb_0316015849-L_175_300.jpg",
          "readgeekid": 494579,
          "title": "Twilight",
          "title_language": "en"
        },
        {
          "author": "Douglas Adams",
          "author_language": "en",
          "cover": "https:\/\/www.readgeek.com\/images\/cover\/.tmb\/thumb_1563892715-L_175_300.jpg",
          "readgeekid": 336012,
          "title": "The Hitch Hiker's Guide to the Galaxy",
          "title_language": "en"
        },
        {
          "author": "Joseph Heller",
          "author_language": "en",
          "cover": "https:\/\/www.readgeek.com\/images\/cover\/.tmb\/thumb_9780684833392-L_175_300.jpg",
          "readgeekid": 11344001,
          "title": "Catch-22",
          "title_language": "en"
        },
        {
          "author": "Dan Brown",
          "author_language": "en",
          "cover": "https:\/\/www.readgeek.com\/images\/cover\/.tmb\/thumb_5550155184-L_175_300.jpg",
          "readgeekid": 12317620,
          "title": "The Da Vinci Code",
          "title_language": "en"
        }
    ]
}
}

const res2={
    "source": "mock",
    "result": "success",
    "user": {
      "updated_books": 1
    }
  }
const createdUser={
  "source": "mock",
  "result": "success",
  "user": {
    "id": 6
  }
}

app.get('/readgeek/:id', checkHeaders, (request, response) => {
    console.log(request.query)
    if(!!request.query.taste_test) {
      return response.json(res)
    }
    return response.json(recommendations)
    
})

app.patch('/readgeek/:id', checkHeaders, (request, response) => {
    console.log(request.body)
    if(!request.body.books) {
      return response.status(401).json({error: 'incorrect input'})
    }

    response.status(201).json(res2)
})

app.get('/openlibrary', (request, response) => {
  console.log(request.query)
  let book=[]
  if(request.query.bibkeys==='ISBN:9780316015844') book=books.twilight
  if(request.query.bibkeys==='ISBN:9780316087360') book=books.eclipse
  response.status(200).json(book)
})

app.post('/readgeek', checkHeaders, (request, response) => {
  response.status(200).json(createdUser)
})


app.listen(port, () => {
    console.log(`running on port ${port}`)
})