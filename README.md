# merge-gpx-files-delf01

Merges multiple gpx files into a single gpx file. 

1. Install the module by typing the following command: `npm install merge-gpx-files-delf01 --save`

1. Get the code in the example section and follow the next steps.

2. Configure the name of the folder that will contain the gpx files. 
Set the property called `nameDirectoryGpxFiles` of the settings object called `paramsObj`.

3. Configure the name of the folder that will contain the merged single gpx file.
Set the property called `nameDirectorySingleGpxFiles` of the settings object called `paramsObj`.

4. Configures the merged gpx file name prefix.
Set the property called `nameSingleGpxFile` of the settings object called `paramsObj`.
The merge creates two files. A minified file whose name is formatted as follows: 'filename_UID.min.gpx' (ex: singleFile_972e9e14-f48e-4d63-abc7-5db6c99d2570.min.gpx) and an indented file whose name is formatted as follows: 'filename_UID. gpx' (ex: singleFile_972e9e14-f48e-4d63-abc7-5db6c99d2570.gpx).

5. Configure file character encoding type (UCS Transformation Format).
Set the property called  'encodageGpxFile' of the settings object called 'paramsObj'.

# NPM package

```javascript
npm install merge-gpx-files-delf01 --save
```

## Example

```javascript
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

// NPM
const mergeGpxFilesDelf01 = require('merge-gpx-files-delf01');

// Run function
let mergeSingleFile = await mergeGpxFilesDelf01.mergeGpxFiles(paramsObj, metaDataObj);

// Output -> On success => object => {minFile: minFileContentString, file: fileContentString}, On error => boolean => false
console.log(mergeSingleFile);

```

> Object property values ​​are required. Leave the value blank if you don't want to use it..
