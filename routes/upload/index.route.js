const express = require('express');
const router = express.Router();
const multer  = require('multer')
const fs = require('fs-extra')
const path = require('path');
const MAX_FILESIZE = 30 * 1024 * 1024; //30mb

var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, process.cwd() + '/audios')
    },
    filename: function (req,file,cb){
        if(file.size > MAX_FILESIZE)
            return cb(null, false);
        const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '')
        const extension = path.extname(file.originalname).toLowerCase()
        cb(null, originalName + '_' + Date.now() + extension)
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILESIZE },
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['mp3', 'wav', 'oga', 'opus', 'mpeg']
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            req.fileValidationError = req.fileValidationError+'_ext';
            return callback(null, false);
        }
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > MAX_FILESIZE) {
            req.fileValidationError = req.fileValidationError+'_fileSize';
            return callback(null, false);
        }
        callback(null, true)
    }
}).single('newAudio');

router.post('/audio', async(req, res) => {
    await fs.ensureDir(`${process.cwd()+"/audios"}`)
    .then(() => {
        upload(req, res, function(err) {
            if(req.fileValidationError) {
                return res.sendStatus(400);
            }
            setTimeout(() => {
                return res.sendStatus(200);
            }, 1000);
        })
    })
    .catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

module.exports = router;