const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/Project', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('connected to server successfully')
})
.catch((err)=>{
    console.log('server Error:',err)
    process.exit(1);
});