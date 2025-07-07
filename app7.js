const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/db", (req, res) => {
    let desc = "";
    if( req.query.desc ) desc = " desc";
    
    let sql= `
    select anime.id, anime.name, anime.score, genre.name as name2
    from anime inner join genre
    on anime.genre_id=genre.id
    `
//order by "score" + desc + " limit " + req.query.pop + ";";//

    db.serialize( () => {
        db.all(sql, (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})

app.get("/db/:genre.name", (req, res) => {
    let sql2=`
    select anime.name, anime.score, genre.name as name2 
    where name2=:genre.name
    from anime inner join genre 
    on anime.genre_id=genre.id;
    `
    db.serialize( () => {
        db.all(sql2, (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('db2', {data:row});
        })
    })
})

app.use(function(req, res, next) {
    res.status(404).send('ページが見つかりません');
  });
  
app.listen(8080, () => console.log("Example app listening on port 8080!"));
  