const multer = require('multer');

// prepartion 
const file = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/upload")

    },
    filename: (req, file, cb) => {
        let name = file.originalname.split('.');
        name = Date.now().toString() + "." + name[name.length - 1];
        cb(null, name);
    }
}) 

const upload = multer({
    storage: file 
})

module.exports = upload

// mengatur folder tujuan yang akan disimpan
