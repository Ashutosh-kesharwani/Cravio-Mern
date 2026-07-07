import { app } from "./app.js";
import connectDB from "./db/server.js";

const PORT = process.env.PORT || 5100;

connectDB()
.then(()=>{
  
  app.on("error",(error)=>{
    console.log("Express :: Error :: ${error}");
    process.exit(1);
  })

  const server = app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
  })

  // Listen Server Error
  server.on("error",(error)=>{
    console.log(`Server :: Error :: ${error}`);
    process.exit(1);
  })
})
.catch((error)=>{
  console.log(`src/server.js :: DB CONNECTION ERROR :: ${error} `);
})
