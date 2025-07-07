const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql2 = [
  `insert into anime ("name", "score", "genre_id") values ("ハイキュー",85,4);`,
  `insert into anime ("name", "score", "genre_id") values ("宇宙よりも遠い場所",95,5);`,
  `insert into anime ("name", "score", "genre_id") values ("ワンピース",95,1);`,
  `insert into anime ("name", "score", "genre_id") values ("ゆるキャン",88,2);`,
  `insert into anime ("name", "score", "genre_id") values ("やはり俺の青春ラブコメはまちがっている。",85,3);`,
  `insert into anime ("name", "score", "genre_id") values ("冴えない彼女の育て方",95,3);`,
  `insert into anime ("name", "score", "genre_id") values ("氷菓",85,5);`,
  `insert into anime ("name", "score", "genre_id") values ("HUNTER☓HUNTER",90,1);`,
  `insert into anime ("name", "score", "genre_id") values ("かぐや様は告らせたい",90,3);`,
  `insert into anime ("name", "score", "genre_id") values ("ご注文はうさぎですか？",80,2);`,
  `insert into anime ("name", "score", "genre_id") values ("中二病でも恋がしたい！",88,3);`,
  `insert into anime ("name", "score", "genre_id") values ("メジャー",90,4);`,
  `insert into anime ("name", "score", "genre_id") values ("ぼっち・ざ・ろっく！",85,2);`,
  `insert into anime ("name", "score", "genre_id") values ("ブルーロック",85,4);`,
  `insert into anime ("name", "score", "genre_id") values ("この素晴らしい世界に祝福を！",88,1);`,
  `insert into anime ("name", "score", "genre_id") values ("月がきれい",90,3);`,
  `insert into anime ("name", "score", "genre_id") values ("ようこそ実力至上主義の教室へ",88,5);`
  
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
