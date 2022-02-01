![image](./merge-gpx-files-delf01.jpg)

[![Node version](https://img.shields.io/badge/node->=14.18.0-orange.svg?style=for-the-badge)](https://nodejs.org/en/about/releases/)
[![GNU License](https://img.shields.io/badge/license-GNU-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0.html)
[![Documentation](https://img.shields.io/badge/Documentation-github-yellow.svg?style=for-the-badge)](https://github.com/delphinbock/merge-gpx-files-delf01/blob/main/README.md)
[![Test](https://img.shields.io/badge/Test-Mocha-brightgreen.svg?style=for-the-badge)](https://github.com/delphinbock/merge-gpx-files-delf01/blob/main/README.md)


Node module that merges multiple gpx files into a single gpx file.

# Video installation

[![Demo video](https://img.youtube.com/vi/rN-PVW-XvSo/0.jpg)](https://youtu.be/rN-PVW-XvSo)

# Installation

1. Install the module by typing the following command in the terminal console: `npm install merge-gpx-files-delf01 --save`

2. Create a folder, in the root folder of the application, in which the multiple gpx files will be placed. The folder name must be configured in the settings object (step 5).

3. Place multiple gpx files in the set directory. Here is a lot of gpx files routes examples: [gpx files list](https://github.com/delphinbock/santiago-de-compostela_spain-north-cape_norway_gpx_files.git)

4. Get the code in the example section and follow the next steps.

5. Configure the name of the folder that will contain the multiple gpx files.
Set the property called `nameDirectoryGpxFiles` of the settings object called `paramsObj`.

6. Configure the name of the folder that will contain the merged single gpx file.
Set the property called `nameDirectorySingleGpxFiles` of the settings object called `paramsObj`.

7. Configures the merged gpx file name prefix.
Set the property called `nameSingleGpxFile` of the settings object called `paramsObj`.
The merge creates two files. A minified file whose name is formatted as follows: 'filename_UID.min.gpx' (ex: singleFile_972e9e14-f48e-4d63-abc7-5db6c99d2570.min.gpx) and an indented file whose name is formatted as follows: 'filename_UID. gpx' (ex: singleFile_972e9e14-f48e-4d63-abc7-5db6c99d2570.gpx).

8. Configure file character encoding type (UCS Transformation Format).
Set the property called  'encodageGpxFile' of the settings object called 'paramsObj'.
By default leave utf8.

9. Configure metadata settings object. Metadata is added to the merged gpx file.
Set the property called  'encodageGpxFile' of the settings object called 'paramsObj'.
Property:
`nameCreatorGpxFile` => name of gpx file creator name, 
`nameTrackGpxFile` => track name, 
`descriptionTrackGpxFile` => description of the route, 
`authorTrackGpxFile` => track creator name, 
`licenseTrackGpxFile` => license, 
`timeTrackGpxFile` => date and time the file was created, 
`keywordsTrackGpxFile` => keywords, each keyword must be separated by a comma, 

10. Import the module `const mergeGpxFilesDelf01 = require('merge-gpx-files-delf01');`

11. Pass the two parameter objects to the function and run the function `let mergeSingleFile = await mergeGpxFilesDelf01.mergeGpxFiles(paramsObj, metaDataObj);`

12. The asynchronous function returns on a success an object containing the gpx file and the minified gpx file, both formatted as a string and on an error, a boolean false.
Output -> On success => object => {minFile: minFileContentString, file: fileContentString}, On error => boolean => false

13. The two merged files (indented and minified) is now in the results folder configured in step 6.

# Use
## Example 1
```javascript
// NPM
const mergeGpxFilesDelf01 = require('merge-gpx-files-delf01');

// Params object
const paramsObj = {
    nameSingleGpxFile: `singleFile`,
    nameDirectoryGpxFiles: `gpx_files`,
    nameDirectorySingleGpxFiles: `single_files`,
    encodageGpxFile: `utf8`
}

// Metadata object
const metaDataObj = {
    nameCreatorGpxFile: `delf01`,
    nameTrackGpxFile: `Santiago to Nordkapp`,
    descriptionTrackGpxFile: `Pilgrims Route gpx file`,
    authorTrackGpxFile: `delf01`,
    licenseTrackGpxFile: `GNU General Public License`,
    timeTrackGpxFile: new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))),
    keywordsTrackGpxFile: `pilgrims, gpx, route, spain`
}

// Run function
mergeGpxFilesDelf01.mergeGpxFiles(paramsObj, metaDataObj);

```
## Example 2

```javascript
// NPM
const mergeGpxFilesDelf01 = require('merge-gpx-files-delf01');

// Params object
const paramsObj = {
    nameSingleGpxFile: `singleFile`,
    nameDirectoryGpxFiles: `gpx_files`,
    nameDirectorySingleGpxFiles: `single_files`,
    encodageGpxFile: `utf8`
}

// Metadata object
const metaDataObj = {
    nameCreatorGpxFile: `delf01`,
    nameTrackGpxFile: `Santiago to Nordkapp`,
    descriptionTrackGpxFile: `Pilgrims Route gpx file`,
    authorTrackGpxFile: `delf01`,
    licenseTrackGpxFile: `GNU General Public License`,
    timeTrackGpxFile: new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))),
    keywordsTrackGpxFile: `pilgrims, gpx, route, spain`
}

// Run async function
const runFunction = async () => {

    let mergeSingleFile = await mergeGpxFilesDelf01.mergeGpxFiles(paramsObj, metaDataObj);

    // Output
    // On success => object => {minFile: minFileContentString, file: fileContentString}
    // On error => boolean => false


    return mergeSingleFile;
}

runFunction();

```
