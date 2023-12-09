const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7100;

const PUBLIC_DIRECTORY = path.join(__dirname, 'public');

function getHTML(filename){
    const htmlFile = path.join(PUBLIC_DIRECTORY, filename);

    return fs.readFileSync(htmlFile, 'utf8');
}

function onReques(req,res){
    switch (req.url) {
        case "/":
        res.setHeader('Content-Type', 'text/html'); 
        res.writeHead(200);
        res.end(getHTML("index.html"));
        break;

        case "/about":
        res.setHeader('Content-Type', 'text/html'); 
        res.writeHead(200);
        res.end(getHTML("about.html"));
        break;
    
        default:
            res.setHeader('Content-Type', 'text/html'); 
            res.writeHead(200);
            res.end(getHTML("404.html"));
        break;    
    }
    //panggil 1 file
    //const htmlFile = path.join(PUBLIC_DIRECTORY, 'index.html');
    //const html = fs.readFileSync(htmlFile, 'utf8');

    //kalau mau panggil json
    // const responeJSON = {
    //     "data":{
    //         "id": 1,
    //         "name": "Burhan"
    //         }
    // }
    // //res.setHeader('ContentType', 'application/json');//pangil JSON
   // res.setHeader('Content-Type', 'text/html'); //Panggil HTML
   // res.writeHead(200);
   // res.end(html);//HTML
    //res.end(JSON.stringify(responeJSON));//panggil JSON
}

const server =  http.createServer(onReques);

server.listen(PORT,() =>{
    console.log(`HTTP Server running on http://localhost:${PORT}`);
})