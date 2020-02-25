const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const compression = require('compression');
const multer = require('multer');
require('dotenv').config();

const PORT = 8080;

const connectDb = require('./config/db.config');
const routers = require('./routers/allRouter');
const { handleError } = require('./utils/errorHandle');

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(compression());
app.use(
    '/uploaded/img',
    express.static(path.join(__dirname, 'public/uploads'))
);
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_.jpg`);
    },
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(new Error('type unmatched'), false);
    }
};
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
    },
    fileFilter,
    // }).single('productImage');
    // }).array('productImage', 1000);
}).any();

app.post('/img/upload', (req, res) => {
    // upload.array('productImage', 2)
    upload(req, res, err => {
        if (err) {
            const status = 415;
            const message = `Error to upload file ${err}`;
            res.status(status).json({ status, message });
        } else {
            const status = 200;
            const uploadedData = req.files.map(data => ({
                // uid: data.filename.replace('.jpg', ''),
                name: data.originalname,
                status: 200,
                url: `/api/img/${data.filename}`,
            }));
            console.log('---', uploadedData);
            res.status(status).json(uploadedData);
        }
    });
});
app.use('/api', routers);
app.use((err, req, res, next) => {
    handleError(err, res);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`);
    connectDb().then(() => {
        console.log('MongoDb connected');
    });
});
