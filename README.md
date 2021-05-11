# Lab 17 | Image Lambda | JavaScript 401
# Author: Lydia Minehan-Tubic

## Links & Resources

✨ [Pull Request]()

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

### Potential issues during deployment 

### Dashboard
images.json PLACEHOLDER

## Sources, Resources & References