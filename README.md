# Lab 17 | Image Lambda | JavaScript 401
# Author: Lydia Minehan-Tubic

## Links & Resources

✨ [Pull Request](https://github.com/LydiaMT/image-lambda/pull/1)

✨ [images.json](https://lydia-chum-bucket.s3-us-west-2.amazonaws.com/images.json)

✨ [lambda](https://github.com/LydiaMT/image-lambda/blob/main/index.js)

## Feature Tasks

1. Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser
2. A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far
3. When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:
  - Download a file called “images.json” from the S3 Bucket if it exists
  - The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present
  - Create a metadata object describing the image: **Name, Size, Type, etc.**
  - Append the data for this image to the array
    - Note: If the image is a duplicate name, update the object in the array, don’t just add it
  - Upload the images.json file back to the S3 bucket

## Documentation

### How to use this lambda

- This Lambda can be used to push metadata from images you upload to an S3 bucket into an array
  - Create an S3 bucket
  - Add an images.json file to your bucket that consists of an empty array `[]`
  - Add your S3 bucket to this lambda function as a trigger
  - Start uploading images to your S3 bucket! Their meta data will now store in your images.json file in the bucket
- The array takes in an object with the properties of name, size, and type
- These objects are stored in an array in an images.json file

### Potential issues during deployment 

- Make sure your file is named images.json
- This current lambda does not cover edge cases for repeate files

### [images.json](https://lydia-chum-bucket.s3-us-west-2.amazonaws.com/images.json)

## Miscellaneous Data Architecture
```json
// Example of returned data
{
"name": "cat.jpg",
"size": 66609,
"type": "image/jpeg"
},

// incoming event payload
{
	"AcceptRanges": "bytes",
	"LastModified": "2021-05-12T02:54:26.000Z",
	"ContentLength": 1575343,
	"ETag": "e18692a8d5b3f413b7c50e8e71a92f1e",
	"ContentType": "image/jpeg",
	"Metadata": {},
	"Body": {
		"type": "Buffer",
		"data": []
	}
}

```

## Sources, Resources & References
- [Stack overflow](https://stackoverflow.com/questions/51803582/aws-s3-listobjects-in-node-js-lambda-function)
- [AWS S3 Docs](https://docs.aws.amazon.com/code-samples/latest/catalog/javascript-s3-s3_listobjects.js.html)
- [AWS lambda](https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html)
- [nodejs how to get JSON instead of Buffer from aws s3 bucket](https://stackoverflow.com/questions/60167391/nodejs-how-to-get-json-instead-of-buffer-from-aws-s3-bucket)
- [AWS Lambda function write to S3](https://stackoverflow.com/questions/40188287/aws-lambda-function-write-to-s3)
