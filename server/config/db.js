import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
// const CONNECTION_URL ='mongodb+srv://admin:admin123@cluster0.puja3.mongodb.net/blogify2?retryWrites=true&w=majority'


const Connect = async()=>{
    try{
        const response = await mongoose.connect(process.env.CONNECTION_URL ,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
                useFindAndModify:false
        })
        console.log("Connected to Database")
    }catch(error){
        console.log(error)
    }
}
export default Connect

