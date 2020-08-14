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
    await db.emptyUserdata()
})

describe('user management', () => {
    test('user register success', async () => {
        const user={
            username: 'username',
            password: 'password',
            email: 'email'
        }
        const response=await api
            .post('/user/register')
            .send(user)
            .expect(201)
        
        const inDb=await db.getUser(user.username)
        expect(inDb.length).toBe(1)
        const data=inDb[0]
        expect(data.id).not.toBe(undefined)
        expect(data.password).not.toBe(undefined)
        expect(data.readgeek_id).not.toBe(undefined)
        expect(data.taste_tested).toBe(false)

        const readlist=await db.getReadLists(data.id)
        expect(readlist.length).toBe(1)
        expect(readlist[0].name).toBe('rated')
    })
    test('user can log in', async () => {
        const user={
            username:'username',
            password:'password'
        }
        const response=await api
            .post('/user/login')
            .send(user)
            .expect(201)
        expect(response.body.token).not.toBe(undefined)
    })
})

describe('readlist handling', () => {
    let login
    
    beforeAll(async()=> {
        const user={
            username:'username',
            password:'password'
        }
    
        login=await api
        .post('/user/login')
        .send(user)
    })


    test('add readlists', async () => {
        const data={
            name: 'lukulista1'
        }
        const response = await api
            .post('/readlists')
            .send(data)
            .set('Authorization', `Bearer ${login.body.token}`)
        readlist1=response.body
        const dbData=await db.getReadLists(login.body.id)
        expect(dbData.length).toBe(2)
    })

    test('readlist with empty name is not added',async ()=> {
        const data={
            name: ''
        }
        const response = await api
            .post('/readlists')
            .send(data)
            .set('Authorization', `Bearer ${login.body.token}`)
        res=response.body
        const dbData=await db.getReadLists(login.body.id)
        expect(dbData.length).toBe(2)
    })

    test('get readlists', async() => {
        const response=await api
        .get('/readlists')
        .set('Authorization', `Bearer ${login.body.token}`)

        const lists=response.body
        expect(lists.length).toBe(2)
    })    

})

describe('bookdata', () => {
    
    let login

    beforeAll(async()=> {
        const user={
            username:'username',
            password:'password'
        }
    
        login=await api
        .post('/user/login')
        .send(user)
    })

    test('add books', async() => {
        const listRated=await db.getListId('rated', login.body.id)
        const list1=await db.getListId('lukulista1', login.body.id)

        const bookdata1={
            "title": "title1",
            "isbn": "isbn",
            "image_url": "imageurl",
            "authors": ["Author1"],
            "readlist_id": listRated[0].id
        }
        const bookdata2={
            "title": "title2",
            "isbn": "isbn",
            "image_url": "imageurl",
            "authors": ["Author2"],
            "readlist_id": listRated[0].id
        }
        const bookdata3={
            "title": "title3",
            "isbn": "isbn",
            "image_url": "imageurl",
            "authors": ["Author1"],
            "readlist_id": list1[0].id
        }
        const bookdata4={
            "title": "title4",
            "isbn": "isbn",
            "image_url": "imageurl",
            "authors": ["Author2"],
            "readlist_id": list1[0].id
        }
    
        const response1=await api
        .post('/books')
        .send(bookdata1)
        .set('Authorization', `Bearer ${login.body.token}`)
    
        const response2=await api
        .post('/books')
        .send(bookdata2)
        .set('Authorization', `Bearer ${login.body.token}`)
    
        const response3=await api
        .post('/books')
        .send(bookdata3)
        .set('Authorization', `Bearer ${login.body.token}`)
    
        const response4=await api
        .post('/books')
        .send(bookdata4)
        .set('Authorization', `Bearer ${login.body.token}`)

        const author1=await db.getAuthorByName('Author1')
        const author2=await db.getAuthorByName('Author2')
        
        expect(author1.length).toBe(1)
        expect(author2.length).toBe(1)
        
        const book1authors=await db.getAuthorsByBookId(response1.body.result.id)
        const book2authors=await db.getAuthorsByBookId(response2.body.result.id)
        const book3authors=await db.getAuthorsByBookId(response3.body.result.id)
        const book4authors=await db.getAuthorsByBookId(response4.body.result.id)
        console.log('authors', book1authors)
        console.log('response1', response1.body.result.id)
        expect(book1authors[0].name).toBe('Author1')
        expect(book2authors[0].name).toBe('Author2')
        expect(book3authors[0].name).toBe('Author1')
        expect(book4authors[0].name).toBe('Author2')
    })
    test('getBooksOnList', async() => {

        const listRated=await db.getListId('rated', login.body.id)
        const list1=await db.getListId('lukulista1', login.body.id)

        const data1= await api
        .get(`/readlists/${listRated[0].id}`)
        .set('Authorization', `Bearer ${login.body.token}`)

        expect(data1.body.length).toBe(2)

        expect(data1.body.map(o => o.title)).toContainEqual('title1')
        expect(data1.body.map(o => o.title)).toContainEqual('title2')

        const data2= await api
        .get(`/readlists/${list1[0].id}`)
        .set('Authorization', `Bearer ${login.body.token}`)

        expect(data2.body.length).toBe(2)

        expect(data2.body.map(o => o.title)).toContainEqual('title3')
        expect(data2.body.map(o => o.title)).toContainEqual('title4')
    })
})

describe('another user', ()=>{
    let login1
    let login2

    beforeAll(async() => {
        const user={
            email:'mail',
            username: 'user2',
            password:'password',
            readgeek_id:7
        }
        await api
        .post('/user/register')
        .send(user)

        const user2={
            username:'username',
            password:'password'
        }
    
        login1=await api
        .post('/user/login')
        .send(user)

        login2=await api
        .post('/user/login')
        .send(user2)
    })
    test('token extracted correctly', async() => {
        const data1={
            name: 'list1'
        }
        await api
            .post('/readlists')
            .send(data1)
            .set('Authorization', `Bearer ${login1.body.token}`)

        const data2={
            name: 'list2'
        }
        await api
            .post('/readlists')
            .send(data2)
            .set('Authorization', `Bearer ${login2.body.token}`)
        const dbData1=await db.getReadLists(login1.body.id)
        expect(dbData1.map(l=>l.name)).toContainEqual('list1')

        const dbData2=await db.getReadLists(login2.body.id)
        expect(dbData2.map(l=>l.name)).toContainEqual('list2')
    })
} )
describe('recommendations', ()=> {
    let login

    beforeAll(async()=> {
        const user={
            username:'username',
            password:'password'
        }
    
        login=await api
        .post('/user/login')
        .send(user)
    })
    test('get books for rating', async() => {
        const response=await api
            .get('/recommendations/sample')
            .set('Authorization', `Bearer ${login.body.token}`)

        expect(response.body.length).toBe(6)

    })

    test('rate books', async() => {
        const book= { 
            authors: ['Stephenie Meyer'],
            author_language: 'en',
            cover: 'image',
            readgeekid: 494579,
            title: 'Twilight',
            title_language: 'en',
            rated:6
        }

        const response= await api
        .post('/recommendations/rate')
        .send(book)
        .set('Authorization', `Bearer ${login.body.token}`)
    })
})

afterAll(() => {
    pool.end()
  })