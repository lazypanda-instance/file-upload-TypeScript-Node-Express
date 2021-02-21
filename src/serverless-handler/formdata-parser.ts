import Busboy from "busboy";
import AWS from "aws-sdk";
const sha1 = require('sha1');

const getContentType = (event: any) => {
    const contentType = event.headers['content-type']
    if (!contentType) {
        return event.headers['Content-Type'];
    }
    return contentType;
};

export const parser = (event: any) => new Promise((resolve, reject) => {
    const busboy = new Busboy({
        headers: {
            'content-type': getContentType(event)
        }
    });

    let result: any = {
        file: '',
        filename: '',
        contentType: ''
    };

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        file.on('data', data => {
            result.file = data;
        });

        file.on('end', () => {
            result.filename = filename;
            result.contentType = mimetype;
        });
    });

    busboy.on('field', (fieldname, value) => {
        result[fieldname] = value;
    });

    busboy.on('error', (error: any) => reject(error));
    busboy.on('finish', () => {
        event.body = result;
        resolve(event);
    });

    busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
});

export const uploadFile = (buffer: any, fileExtension: string) => new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    const bucketName = "lazypanda-blog-images";
    let hash = sha1(new Buffer(new Date().toString()));
    const fileName = hash + '.' + fileExtension;

    const data = {
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
    };
    s3.putObject(data, (error) => {
        if (!error) {
            resolve(fileName);
        } else {
            reject(new Error('error during put'));
        }
    });
});