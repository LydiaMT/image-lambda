'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({apiVersion: '2006-03-01'});

exports.handler = async (event, context) => { // this handles the image upload event

  const bucket = event.Records[0].s3.bucket.name; // pulls the bucket name out of the event
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' ')); // pulls the newly uploaded file name out of the event
  const params = { // this is an object that returns the bucket and key params we pulled off the event
      Bucket: bucket,
      Key: key,
  }; 
  if(key === 'images.json') return // catch for updating image.json to not loop
  
  let imgArray = []; // initalizes empty image array

  // ------- LOADS IMAGES.JSON TO IMAGE ARRAY -------
  try {
    const bucketObj = await s3.getObject({ // us s3 method to READ image.json file
      Bucket: bucket, 
      Key: 'images.json', 
    }).promise() 
    imgArray = JSON.parse(bucketObj.Body.toString('utf-8')); // parses the file back to JSON. utf-8 is the file encoding for JSON
  } catch(error){
    return error;
  }

  // ------- LOADS IMAGE DATA & ADDS TO ARRAY -------
  try {
    const bucketObj = await s3.getObject(params).promise() // this line READs the image file (or uploaded file)
    let imgData = { // img properties
      name: key,
      size: bucketObj.ContentLength,
      type: bucketObj.ContentType
    }
    imgArray.push(imgData) // push them into the array
  } catch(error){
    return error;
  }

  // ------- WRITE BACK TO IMAGES.JSON -------
  try{
    const output = await s3.putObject({ // this updates the image.json file with the new output
      Bucket: bucket, // "in the bucket..."
      Key: 'images.json', // "in this file..."
      Body: JSON.stringify(imgArray), // "put this thing..."
      ContentType: 'application/json; charset=utf-8', // Set what type of file it is
      Expires: new Date(), // This prevents caching
      ACL: 'public-read' // This makes the file acces public
    }).promise()
    return JSON.stringify(output); // stringify the output aka the eTag of the image json
  } catch(error){
    return error
  }

}