# Explanation of `server.js`

This document explains the `server.js` file in detail, breaking down each part of the code to help to understand its purpose and functionality. This will serve as a reference in the future.

---

## 1. Importing Required Modules
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');
```
- **`http`**: This module is used to create a web server.
- **`fs`**: The File System module allows you to read files from your computer.
- **`path`**: This module helps manage file paths in a way that works across different operating systems.

---

## 2. Setting the Port
```javascript
const port = 3000;
```
- The server will listen on port `3000`. You can access it in your browser at `http://localhost:3000`.

---

## 3. Creating the Server
```javascript
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);
```
- **`http.createServer`**: Creates the server.
- **`req`**: The request object, which contains details about the incoming request (e.g., URL, method).
- **`res`**: The response object, used to send data back to the client.
- **`filePath`**: Determines which file to serve. If the user visits `/`, it serves `index.html`. Otherwise, it serves the file requested in the URL.

---

## 4. Determining the File Type
```javascript
const extName = String(path.extname(filePath)).toLowerCase();

const mimeType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'text/png',
};

const contentType = mimeType[extName] || 'application/octet-stream';
```
- **`extName`**: Extracts the file extension (e.g., `.html`, `.css`).
- **`mimeType`**: Maps file extensions to their content types. For example:
  - `.html` → `text/html`
  - `.css` → `text/css`
- **`contentType`**: The MIME type of the file being served. If the file type is unknown, it defaults to `application/octet-stream`.

---

## 5. Reading and Serving Files
```javascript
fs.readFile(filePath, (err, content) => {
    if (err) {
        if (err.code === 'ENOENT') {
            res.writeHead(404, { "content-type": 'text/html' });
            res.end('404: File Not Found Bro!');
        }
    } else {
        res.writeHead(200, { 'content-type': contentType });
        res.end(content, 'utf-8');
    }
});
```
- **`fs.readFile`**: Reads the requested file from the file system.
- **Error Handling**:
  - If the file doesn’t exist (`ENOENT`), it sends a `404` error with a custom message.
- **Success**:
  - If the file exists, it sends the file content with the appropriate `contentType`.

---

## 6. Starting the Server
```javascript
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
```
- **`server.listen`**: Starts the server and listens for incoming requests on the specified port.
- A message is logged to the console to indicate that the server is running.

---

## Summary
This code creates a simple web server that:
1. Listens for HTTP requests.
2. Serves static files like `index.html`, `about.html`, etc.
3. Handles errors (e.g., file not found).
4. Sends the correct content type for each file.

### Why This is Useful
- **Learning**: Helps you understand the basics of how servers work.
- **Foundation**: Prepares you for using frameworks like Express.js.
- **Practice**: Gives you hands-on experience with Node.js modules like `http`, `fs`, and `path`.

---
