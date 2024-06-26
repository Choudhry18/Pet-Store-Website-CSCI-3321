const express = require("express");
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const adminModel = require('../models/adminModel.js');

// For session stuff
const sess = require("../session.js").sessionSetup;
router.use(sess);

router.use(express.json());
router.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, "prodimage_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

/* adminModel.addListing()
Expects
req.body {
    title:
    description:
    price:
    quantity:
    rating:
    password:
}
file {
    filename: (of uploaded image)
} 
If addListing fails, the given image (if it exists) must be removed
*/
router.post('/add', upload.single('image'), function(req, res) {
    adminModel.addListing(req.session.username, req.body, req.file, (result) => {
        if(!result.success && req.file) {
            adminModel.removeFile(req.file.filename);
        }
        return res.json(result);
    });
});

/* adminModel.removeListing()
Expects
req.body {
    password:
    prod_id
    removing
}
*/
router.post('/remove', function(req, res) {
    adminModel.setRemovedListing(req.session.username, req.body.password, req.body.prod_id, req.body.removing, (result) => {
        return res.json(result);
    });
});

/* adminModel.addListing()
Expects
req.body {
    id:
    title:
    description:
    price:
    quantity:
    rating:
    password:
}
file {
    filename: (of uploaded image)
} 
If image is changed, the old image must be removed
*/
router.post('/edit', upload.single('image'), function(req, res) {
    adminModel.editListing(req.session.username, req.body, req.file, (result) => {
        if(!result.success && req.file) {
            adminModel.removeFile(req.file.filename);
        }
        return res.json(result);
    });
});

// adminModel.getAuditTrail()
// Must be sent a product ID
router.post('/audit', function(req, res) {
    adminModel.getAuditTrail(req.body.productID, (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    });
});

module.exports = router;