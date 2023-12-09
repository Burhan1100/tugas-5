import express, { Application, Request, Response} from 'express';
import { DefaultResponse } from './models/dto/default';
import listUser from './users.json';
import { User } from './models/entity/user';
import multer from 'multer';//
import patc from 'path';//
import cloudinary from './config/cloudinary';
// import uploadOnMemory from './config/upload';

const app: Application = express();
const PORT: number = 8089;


// TODO: Endpoint to get list user
// Change response into new structured
// {
// "id": 1,
// "neme": arras,
// "profil_photo_url": "URL_FROM_CLOUDINARY"(this is the addaitional data)
//  }

app.get('/api/users',(req: Request, res: Response)=>{
    const nameQuery: string = (req.query.name as string);

    const response: DefaultResponse = {
        Status:"OK",
        Massage : "Success retrieving data",
        Data : {
           users: listUser.map((user: User)=>({
                id: user.id,
                name: user.name || '',
            })).filter((user: User) => 
                user.name?.toLowerCase().includes(nameQuery.toLowerCase())
            ),
        },
    };
    res.status(200).send(response);
});

// TOdo: Endpoint to get User by ID
app.get('/api/users/:id',(req:Request, res:Response)=>{
    const id: number = parseInt(req.params.id);
    const user = listUser.find(user  => user.id == id);    

    if (!user) {
        const response: DefaultResponse = {
            Status:"NOT_FOUND",
            Massage : "Data Not Founded",
            Data : null,
        };
        res.status(200).send(response);
    } 
        const response: DefaultResponse = {
            Status:"FOUNDED",
            Massage : "Founded Data",
            Data : listUser.find((user: User) => user.id == id),
        };
    
    res.status(200).send(response);
})

// TODO: Endpoint create user 
// create an endpoint for creating user

// Also need to integrate with cloudinary (plaase check in PPT)
// Mendefinisikan gimana cara nyimpen file-nya
const upload = multer({ storage: multer.memoryStorage() });
// Middleware untuk mengunggah gambar ke Cloudinary
const uploadOnMemory = upload.single('picture');

app.put("/api/v1/profile/:id/picture/cloudinary",
uploadOnMemory,(req,res)=>{
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
 
// what you need store:
// {
// "id": 1,
// "neme": arras,
// "profil_photo_url": "URL_FROM_CLOUDINARY"(this is the addaitional data)
//  }
// meke sure you can get values from form data


app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`);
})