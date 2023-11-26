# Node.js S3-Like Service with MySQL Storage

This Node.js project simulates basic operations of an S3-like service using MySQL as the storage backend.

## Prerequisites

Before running the project, make sure you have the following:

1. Node.js installed
2. MySQL database set up
3. `.env` file with the following configuration:
    - `DB_HOST`: Database host
    - `DB_USER`: Database user
    - `DB_PASSWORD`: Database password
    - `DB_NAME`: Database name
    - `PORT`: Server port

## Endpoints

1. Buckets:
    - GET /buckets: Get a list of all buckets.
    - POST /buckets: Create a new bucket.
        Request body :
            {
                "name" : "Enter a bucket name"
            }

2. Objects:
    - GET /objects/:bucketId/objects: Get a list of all objects in a bucket.
    - GET /objects/:bucketId/objects/:objectKey: Get a specific object in a bucket.
    - POST /objects/:bucketId/objects/:objectKey: Create a new object in a bucket.
        Request body :
            {
                "data" : "Enter string/text data"
            }
    - DELETE /objects/:bucketId/objects/:objectKey: Delete a specific object in a bucket.

## SQL Query for creating Task table

-   CREATE DATABASE S3LikeService;

-   CREATE TABLE buckets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    );

-   CREATE TABLE objects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bucket_id INT,
        `key` VARCHAR(255) NOT NULL UNIQUE,
        `data` TEXT,
        FOREIGN KEY (bucket_id) REFERENCES buckets(id) ON DELETE CASCADE
    );