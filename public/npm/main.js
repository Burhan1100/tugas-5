console.log("heloo Burhan, aplikasi sedag berjalan....");



const luasSegitiga = require('./luasSegiga');
console.log('Luas Segitiga:',luasSegitiga(5,5));

//buat file
const fs =  require('fs');
fs.writeFileSync("./file.txt","Ini file ditulis dari node JS");
//read file
const fileConten = fs.readFileSync("./file.txt","utf-8");
console.log(fileConten);


const personData ={
    id: "1",
    name: "Burhan"
};

fs.writeFileSync("./person.json",JSON.stringify(personData));