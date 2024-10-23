const multer = require("multer");
//set  storage
const storage = multer.diskStorage({
    destination: (req,file,cb)=>
    {
        cb(null, "uploads/");
    },
    filename:(req,file,cb) =>{
        cb(null,`${Data.now()}-${file.originalname}}`);
    },

});
//initialize upload
const upload  = multer({
    storage:storage,

}).fields([
    {name: "fromtImage", maxCount:1},
    {name: "audioFile", maxCount:1},
]);

module.exports = upload;
