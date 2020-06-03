const jsonServer=require('json-server')
const server = jsonServer.create()
const router= jsonServer.router('./db.json')
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares)
server.use(jsonServer.rewriter({
    '/readlists/:id': '/books',
    '/recommendations/sample': '/sample',
    '/recommendations/rate': '/rate'
  }));
server.use(router)
server.listen(port, () => {
    console.log(`server runnin on port ${port}`)
} )