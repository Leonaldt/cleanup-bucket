const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const params = {
    Bucket: process.env.AWS_BUCKET_NAME
}

async function main() {
    try {
        await s3.listObjects(params).promise()
            .then((data) => {

                data.Contents.forEach(bucket => {
                    s3.deleteObject({
                        Bucket: process.env.AWS_BUCKET_NAME,
                        Key: bucket.Key
                    }).promise();
                })

            })
            .catch(error => {
                console.error(error)
            });
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);
