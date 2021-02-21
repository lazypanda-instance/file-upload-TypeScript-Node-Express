import multer = require("multer");
import aws = require('aws-sdk');
import multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

const imageFilter = (req: any, file: any, cb: any) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

export const upload = multer({
    fileFilter: imageFilter,
    // storage
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: `${process.env.AWS_BUCKET_NAME}`,
        cacheControl: 'max-age=31536000',
        metadata: (req, file, cb) => {
          cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
          cb(null, `${Date.now().toString()}.jpg`)
        }
      })
}).single('file');

