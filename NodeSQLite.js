var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dummy.db');
var check;
db.serialize(function () {
    db.run("CREATE TABLE if not exists tabla (columna TEXT)");
    var comm = db.prepare("INSERT INTO tabla VALUES (?)");
    for (var i = 0; i < 5; i++) {
        comm.run("dato-" + i);
    }
    comm.finalize();
    //
    //
    db.run("UPDATE tabla SET columna = ? WHERE rowid = ?", "update", 4);
    //
    //
    db.run("DELETE FROM tabla WHERE rowid = ?", 5);
    //
    //
    db.run("INSERT INTO tabla (columna) VALUES (?)", "insert");
    //
    //
    db.each("SELECT rowid AS id, columna FROM tabla", function (err, row) {
        console.log(row.id + ": " + row.columna);
    });
    //
    //
    db.run("DROP TABLE tabla");
});
db.close();