# merge-gpx-files-delf01

Merges multiple gpx files into a single gpx file. 

1. Configure the name of the folder that will contain the gpx files. 
Set the property called `nameDirectoryGpxFiles` of the settings object called `paramsObj`.

2. Configure the name of the folder that will contain the merged single gpx file.
Set the property called `nameDirectorySingleGpxFiles` of the settings object called `paramsObj`.

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

// Output -> On success => object => {data: fileContentString}, On error => boolean => false
console.log(mergeSingleFile);

```

> Object property values ​​are required. Leave the value blank if you don't want to use it..
