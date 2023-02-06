import { useState, useEffect } from "react";
import './App.css';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Article from './pages/Article';
import ArticleList from './pages/ArticleList'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e1d744d0d3msh7d94eb8b3aee2b3p1fa005jsndab589994e7b',
    'X-RapidAPI-Host': 'medium2.p.rapidapi.com'
  }
};

let articlesList = [];

function fetchArticles(article) {
  fetch('https://medium2.p.rapidapi.com/article/' + article + '/content', options)
  .then((response) => response.json())
  .then((data) => articlesList.push(data["content"]))
}

function fetchPublicationData() {
  fetch('https://medium2.p.rapidapi.com/publication/id_for/the-foss-albatross', options) // gets publication ID
  .then((response) => response.json()) // turns the publication ID response into a javascript Object
  .then((data) => fetch('https://medium2.p.rapidapi.com/publication/'+ data["publication_id"] + '/articles', options)) // uses Object to fetch article IDs 
  .then((response) => response.json()) // turns the article ID response into a javascript Object
  .then((data) => {
    for (let article of data["publication_articles"]) { // iterates through the array of article IDs to fetch article content
      setTimeout(fetchArticles(article), 2000) // timeout so we don't make requests too fast
    }
  })
}

function App() {
  let fetch = false;

  useEffect(() => {
    //fetch = true;
    if (fetch){
      fetchPublicationData();
    }
    
    return () => fetch = false;
  }, [])

 // console.log(articles_list);

  return (

      <div className="App">
        <HomePage/>
        <AboutPage/>
        <ArticleList/>
        <Article/>
      </div>

  );
}

export default App;
