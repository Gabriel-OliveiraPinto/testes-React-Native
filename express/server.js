const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const connection = require('./connect');
// Esse é o arquivo do servidor que controla as ações ao receber os Requests
app.use(bodyParser.json())

let articles = [

];
function refreshArticles(){
    let select = `SELECT * FROM articles`;

    articles = []
    connection.query(select, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        
        for(let i = 0; i < results.length; i++) {
            let id = results[i].id;
            let title = results[i].title;
            let content = results[i].content;
            articles.push({'id': id, 'title': title, 'content': content});
        }
        
        console.log(articles);
    })
    
}


refreshArticles();



app.get('/', (req, res) => {
    console.log("Entrei aqui")
    res.json(articles);
})  
app.post('/', (req, res) => {
    // console.log(req.body)
    const article = {
        id: parseInt(req.body.id),
        title: req.body.title,
        content: req.body.content
    }
    let insert = `INSERT INTO articles(id, title, content) VALUES (${article.id}, '${article.title}', '${article.content}');`;

    connection.query(insert, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
    });
    refreshArticles();
    // console.log(articles)
    res.json(articles);
})

app.delete('/:id', (req, res) => {

    // console.log(articles);
    // res.json(article);
    console.log(req.params.id);
    const article = {
        id: parseInt(req.params.id)
    }
    // const article = {
    //     id: parseInt(req.body.id),
    //     title: req.body.title,
    //     content: req.body.content
    // }
    // console.log("Estou no delete!")
    // console.log(article.id);
    // console.log(article.title);
    // console.log(article.title);
    let del = `DELETE FROM articles WHERE id = ${article.id}`;
    
    connection.query(del, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
    });
    refreshArticles();
    res.json(articles);
    
})

app.put('/', (req, res) => {
    const article = {
        id: parseInt(req.body.id),
        title: req.body.title,
        content: req.body.content
    }
    console.log("aqui está o artigo: " + article.id + article.title + article.content);
    let update = `UPDATE articles SET title = '${article.title}', content = '${article.content}' WHERE id =  ${article.id}`;

    connection.query(update, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
    });
    refreshArticles();
    res.json(articles);
})
app.listen(port, () => {console.log(`I'm listening at localhost:${port}!`)})