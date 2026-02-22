let multer = require('multer');

let storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./public/images');
    },
    filename: (req, file, cb) =>{
        let fileType="";
        let fileMime = file.mimetype;

        if(fileMime === 'image/gif'){fileType='.gif'};
        if(fileMime === 'image/png'){fileType='.png'};
        if(fileMime === 'image/jpeg'){fileType='.jpg'};

        cb(null, 'image-' + Date.now() + fileType);
    }
});

let upload = multer({storage: storage});

module.exports = upload;
