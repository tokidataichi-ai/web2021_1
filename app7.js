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
    let pop=100;
    if( req.query.desc ) desc = " desc";
    if( req.query.pop ) pop = req.query.pop;
    let sql= `
    select anime.id, anime.name, anime.score, genre.name as name2, genre.id as genreid
    from anime inner join genre
    on anime.genre_id=genre.id
    order by score ` + desc + ` limit ` + pop + `;
    `
    //console.log(sql);
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

app.get("/db/:genreid", (req, res) => {
    let sql2=`
    select anime.name, anime.score, anime.genre_id, genre.name as name2, genre.id as genreid
    from anime inner join genre 
    on anime.genre_id=genre.id
    where genre_id=`+ req.params.genreid +`;
    `
    console.log(sql2);
    db.serialize( () => {
        db.all(sql2, (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(row);
            res.render('db2', {data:row});
        })
    })
})

app.use(function(req, res, next) {
    res.status(404).send('ページが見つかりません');
  });
  
app.listen(8080, () => console.log("Example app listening on port 8080!"));
  