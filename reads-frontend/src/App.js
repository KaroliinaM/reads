import React from 'react';


const App =({books})=> (
  <div>Hello World
    {console.log(books)}
    {console.log(books[0].image)}
    <img src={books[0].image} alt="Smiley face" /> 
    
  </div>
)

export default App;
