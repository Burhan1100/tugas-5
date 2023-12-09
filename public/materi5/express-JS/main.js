const express = require('express');
const fs = require('fs');
const listUser = require('./users.json');
const uploadOnMemory = require('./uploadOnMemory.js');
const upload =  require('./upload.js');
const cloudinary = require('./cloudinary.js');

const app = express();
app.use(express.json());


app.get("/api/users",(req,res) =>{
    const nameQuery = req.query.name;
    const nameQueryLowerCase = nameQuery.toLowerCase();

    const response = {
        status: "OK",
        message:"Succes retrieving data",
        data: {
            users: listUser.filter(user => user.name.toLowerCase().includes(nameQueryLowerCase)),
        },
    }
    res.send(response);
});

app.get("/api/users/:id",(req, res) =>{
    const id = parseInt(req.params.id);
   const user = listUser.find(user => user.id == id);

   if (user) {
       const response = {
           status: "DATA_FOUND",
            message:"Success retrieving data",
            data: {
                user: user,
            }
        }
        res.status(200).send(response);
    }

    const response = {
        status: "NOT_FOUND",
         message:"Failed Data Not Found",
         data: {
             user: null,
            }
        }
        res.status(400).send(response);
})

app.post("/api/users",(req, res) =>{
    const playlod = req.body;
    const userCreate ={ id: listUser[listUser.length -1].id +1,    name: playlod.name    }

    if (!playlod.name) {
        const response = {
            status: "BAD_REQUEST",
             message:"Name Field Cannot Be Empty",
             data: {
                 userCreate: null,
                }
            }
            res.status(400).send(response);
    }

    listUser.push(userCreate);
    fs.writeFileSync("./users.json",JSON.stringify(listUser));

    const response = {
    status: "CREATED",
         message:"Success to created Data",
         data: {
              userCreate: userCreate,
            }
        }
    res.status(201).send(response);
})

app.put("/api/v1/profile/:id/picture/cloudinary",
uploadOnMemory.single("picture"), (req,res)=>{
    const fileBased64 = req.file?.buffer.toString("base64")
    const file = `data:${req.file?.mimetype};base64,${fileBased64}`
    
    cloudinary.uploader.upload(file, function(err,result){
        if(!!err){
            console.log(err);
            return res.status(400).json({
                message: "Gagal Upload File"
            })
        }

        res.status(201).json({
            message: "Upload Image Berhasil",
            url: result?.url,
        })
    })
})
 
// wha

const PORT = 8089;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})