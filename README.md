# merge-gpx-files-delf01

Merges multiple gpx files into a single gpx file. 


## NPM package

```javascript
npm install merge-gpx-files-delf01 --save
```

## Example

```javascript
// Params obj
const paramsObj = {
    nameSingleGpxFile: `singleFile`, 
    nameDirectoryGpxFiles: `gpx_files`,
    nameDirectorySingleGpxFiles: `single_files`,
    encodageGpxFile: `utf8`
}

// Metadata obj
const metaDataObj = {
    nameCreatorGpxFile: `delf01`,
    nameTrackGpxFile: `Santiago to Nordkapp`,
    descriptionTrackGpxFile: `Pilgrims Route gpx file`,
    authorTrackGpxFile: `delf01`,
    licenseTrackGpxFile: `GNU General Public License`,
    timeTrackGpxFile: new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))),
    keywordsTrackGpxFile: `pilgrims, gpx, route, spain`
}
const mergeGpxFiles = require('merge-gpx-files-delf01');
```

> Object property values ​​are required. Leave the value blank if you don't want to use it..
