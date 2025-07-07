const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql2 = [
  `insert into anime ("name", "score", "genre_id") values ("中二病でも恋がしたい！",88,3);`,
  `insert into anime ("name", "score", "genre_id") values ("この素晴らしい世界に祝福を！",88,1);`
  
  ]

for( let sql of sql2 ) {
db.serialize( () => {
  db.run( sql, (error, row) => {
    if(error) {
      console.log('Error: ', error );
      return;
    }
    console.log( "データを追加しました" );
  });
});
};
