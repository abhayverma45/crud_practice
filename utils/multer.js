const multer = require('multer');
const path=require('path')


// Specify the destination directory

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,__dirname  + '/../public/images/' );
      // console.log("hello from multer")
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })
  // console.log(storage)
  

  module.exports=upload;