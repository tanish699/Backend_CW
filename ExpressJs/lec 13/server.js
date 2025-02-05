const express=require("express");
const app=express();

app.use(express.static('public'));

app.get("/",(req,res)=>{    
res.send("hello World");
});


app.listen(3000,()=>{    
    console.log("Server is running at port 3000");
}); 
