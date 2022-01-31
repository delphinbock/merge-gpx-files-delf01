// Color console
var colors = require('colors');

// Library
const mainFunctions = require("./lib/mainFunctions");

exports.mergeGpxFiles = async (paramsObj, metaDataObj) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Params obj
            /*const paramsObj = {
                nameSingleGpxFile: `singleFile`,
                nameDirectoryGpxFiles: `gpx_files`,
                nameDirectorySingleGpxFiles: `single_files`,
                encodageGpxFile: `utf8`
            }*/

            // Metadata obj
            /*const metaDataObj = {
                nameCreatorGpxFile: `Delphin Bock`,
                nameTrackGpxFile: `EuroVelo 3 - Pilgrims Route`,
                descriptionTrackGpxFile: `EuroVelo 3 - Pilgrims Route's gpx route with stages`,
                authorTrackGpxFile: `Delphin Bock`,
                licenseTrackGpxFile: `GNU General Public License`,
                timeTrackGpxFile: new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))),
                keywordsTrackGpxFile: `eurovelo 3, velo, pilgrims, gpx, route, stages, spain, france, belgium, germany, denmark, sweden, norway`
            }*/

            // Check if the settings objects are right
            if (Object.keys(paramsObj).length === 4 && Object.keys(metaDataObj).length === 7) {

                // Get all gpx filenames
                const gpxFilenamesArray = await mainFunctions.getAllGpxFilenamesDirectory(paramsObj);

                // Check if there are some gpx files in gpx directory
                if (gpxFilenamesArray.length !== 0) {

                    // Write meta data gpx file
                    let writtenMetadataGpxFile = await mainFunctions.writeMetaDataGpxFile(paramsObj, metaDataObj);

                    // Check if the metadata are written
                    if (writtenMetadataGpxFile) {

                        // Sort and get data foreach gpx file
                        gpxFilenamesArray.sort().forEach(async (gpxNameObj, i) => {

                            // Get each track
                            const gpxDataArray = await mainFunctions.splitGpxFiles(paramsObj, gpxNameObj);

                            // Listing each track
                            gpxDataArray.forEach(async (mergeGpxData, f) => {

                                // Append data to file
                                let appendData = await mainFunctions.appendDataToFile(paramsObj, mergeGpxData, gpxNameObj.name);

                                // If append data is done
                                if (appendData) {

                                    // Loop's end
                                    if (gpxFilenamesArray.length === i+1) {

                                        // Append end tag
                                        let endTag = await mainFunctions.appendEndTag(paramsObj);

                                        // If end tag is added
                                        if (endTag) {

                                            // Create a minified gpx file and indented gpx file in the directory named "single_Files"
                                            let processFile = await mainFunctions.processFile(paramsObj);

                                            if (typeof processFile === "object") {

                                                // Success message
                                                console.log(":) Yippee-ki-yay, multiples gpx files are merged".green)

                                                resolve(processFile);

                                            } else {

                                                resolve(false);

                                            }

                                        } else {

                                            // Success message
                                            console.log(":( The end tag is not added successfully".red);

                                        }
                                    }

                                }

                            });

                        });
                    }
                } else {

                    // Error message
                    console.log(":( The gpx files directory does not contain files".red)

                    resolve(false);

                }
            } else {

                // Error message
                console.log(":( All properties of settings objects are required !".red);
                console.log(":| Check the settings objects".cyan);

                resolve(false);
            }
        } catch(error) {
            console.log(':( MergeGpxFiles error');
            reject(console.log);
        }
    })
}