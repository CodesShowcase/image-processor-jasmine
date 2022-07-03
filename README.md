# Image Processing API

This is an Image Processing API, allowing you to view, resize and greyscale images.

## Getting Started

Installation =\> Change to root directory and type in *npm i*  
Start =\> Start the application with *npm start* | default port is 8080  
Build =\> Build the Application in the build folder with *npm run build*  
Tests =\> Tests can be run with *npm run test*  

## Usage

The default port is 8080 (e.g. http://localhost:8080)  

Image Processing API =\> Please access the correct endpoint  
"/api/view" =\> returns all available pictures in the folder  
"/api/view?file=name" =\> returns single picture (file - name)  
"/api/resize?file=name&width=pixel&height=pixel" =\> resizes single picture (file - name / width & height in pixel / resulting file - name-resized-width-height.jpg)  
u"/api/greyscale?file=name" =\> recolors a single picture (file - name / resulting file - name-greyscale.jpg)  

Attention - for all operations please use the filename without the filetype ending and it only works for .jpgs!'  