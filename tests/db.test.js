const supertest=require('supertest')
const app=require('../app')
const {pool} =require('../utils/Database')
const db = require('../models/queries')

const api=supertest(app)

let readlist1
let readlist2
let book1
let book2
let book3
let book4

beforeAll( async ()=> {
    await db.emptyBookToAuthor()
    await db.emptyBook()
    await db.emptyAuthor()
    await db.emptyReadlist()
})

test('database calls respond', async ()=> {
    await api
        .get('/readlists')
        .expect(200)
        .expect('Content-Type',/application\/json/)
})
test('add readlists', async () => {
    const data={
        name: 'lukulista1'
    }
    const data2={
        name: 'lukulista2'
    }
    const response = await api
        .post('/readlists')
        .send(data)
    readlist1=response.body

    const response2 = await api
        .post('/readlists')
        .send(data2)
    readlist2=response2.body
    console.log(readlist1, readlist2)


    const response3=await api
    .get('/readlists')
    expect(response3.body).toContainEqual(readlist1)
    expect(response3.body).toContainEqual(readlist2)
})
test('add books', async () => {
    const bookdata1={
        "title": "title1",
        "isbn": "isbn",
        "image_url": "imageurl",
        "authors": ["Author1"],
        "readlist_id": readlist1.id
    }
    const bookdata2={
        "title": "title2",
        "isbn": "isbn",
        "image_url": "imageurl",
        "authors": ["Author2"],
        "readlist_id": readlist1.id
    }
    const bookdata3={
        "title": "title3",
        "isbn": "isbn",
        "image_url": "imageurl",
        "authors": ["Author1"],
        "readlist_id": readlist2.id
    }
    const bookdata4={
        "title": "title4",
        "isbn": "isbn",
        "image_url": "imageurl",
        "authors": ["Author2"],
        "readlist_id": readlist2.id
    }

    const authordata1={
        name: "Author1"
    }

    const authordata2={
        name: "Author2"
    }

    const response1=await api
        .post('/books')
        .send(bookdata1)
    book1=response1.body

    const response2=await api
    .post('/books')
    .send(bookdata2)
    book2=response2.body

    const response3=await api
    .post('/books')
    .send(bookdata3)
    book3=response3.body

    const response4=await api
    .post('/books')
    .send(bookdata4)
    book4=response4.body

    const response5=await api
        .get('/author')
        .send(authordata1)

    const response6=await api
        .get('/author')
        .send(authordata1)
    expect(response5.body.length).toBe(1)
    expect(response6.body.length).toBe(1)

    const response7= await api
        .get(`/readlists/${readlist2.id}`)

    expect(response7.body.length).toBe(2)

    expect(response7.body.map(o => o.id)).toContainEqual(book3.id)
    expect(response7.body.map(o => o.id)).toContainEqual(book4.id)

    console.log(book1, book2, book3, book4)

    const response8 = await api
        .get(`/books/${book1.id}`)

    console.log('res8',response8)
    console.log('bookdata8', bookdata1)

    expect(response8.body.title).toEqual(bookdata1.title)
    expect(bookdata1.authors).toEqual(response8.body.authors)

    const response9 = await api
    .get(`/books/${book2.id}`)

    expect(response9.body.title).toEqual(bookdata2.title)
    expect(bookdata2.authors).toEqual(response9.body.authors)

    const response10 = await api
    .get(`/books/${book3.id}`)

    expect(response10.body.title).toEqual(bookdata3.title)
    expect(bookdata3.authors).toEqual(response10.body.authors)

    const response11 = await api
    .get(`/books/${book4.id}`)

    expect(response11.body.title).toEqual(bookdata4.title)
    expect(bookdata4.authors).toEqual(response11.body.authors)
})



afterAll(() => {
    pool.end()
  })