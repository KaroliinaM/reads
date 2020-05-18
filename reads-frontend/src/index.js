import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const books=[{
  isbn10: "0060512148",
  isbn13: "9780060512149",
  title: "Angels",
  author: "Marian Keyes",
  image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1407711412l/82747._SX98_.jpg",
  description: "Maggie has always been the white sheep of the Walsh family.Unlike her comically dysfunctional sisters,Rachel(heroine of Rachel's Holiday) and Claire (heroine of Watermelon), she married a decent man who adored her and found herself a solid career. Where Rachel was reckless and Claire dramatic, Maggie settled early for safety. Or so she believed until she discovers that her husband is having an affair and her boss is going to fire her. Suddenly, her perfectly organized life has become a perfect mess.",
  pages: "",
  published: "",
  tags: ["chick lit", "fiction"],
  similar: ["0060852003", "0385338694"]
},
{
  isbn10: "0440241901",
  isbn13: "9780440241904",
  title: "Can You Keep a Secret?",
  author: "Sophie Kinsella",
  image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1330464293l/33724._SY160_.jpg",
  description: "Meet Emma Corrigan, a young woman with a huge heart, an irrepressible spirit, and a few little secrets: Secrets from her boyfriend: I've always thought Connor looks a bit like Ken. As in Barbie and Ken. Secrets from her mother: I lost my virginity in the spare bedroom with Danny Nussbaum while Mum and Dad were downstairs watching Ben-Hur",
  pages: "",
  published: "",
  tags: ["chick lit", "fiction"],
  similar: ["014028009X", "0307275558"]
}
]

ReactDOM.render(
  <React.StrictMode>
    <App books={books} />
  </React.StrictMode>,
  document.getElementById('root')
);
