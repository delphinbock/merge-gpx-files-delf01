/************* NPM ******************/

// Color console
var colors = require('colors');

// Files manager
var fs = require('fs');

// path manager
var path = require('path');

/*********** FUNCTIONS **************/

// Root app directory
exports.rootAppPath = async () => {
  return new Promise(async (resolve, reject) => {
      try {
          var rootAppDirectoy = path.dirname(require.main.filename);
          resolve(rootAppDirectoy);
      } catch(error) {
          console.log(':( rootAppPath error'.red);
          reject(console.log);
      }
  })
}

// Add data to file
exports.appendDataToFile = async (paramsObj, mergeGpxData, gpxName) => {
    return new Promise(async (resolve, reject) => {
      try {

        // Root path
        let rootAppPath = await exports.rootAppPath();

        // File link
        let fileLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}/${paramsObj.nameSingleGpxFile}.gpx`;

        // Add data to file
        fs.appendFile(fileLink, mergeGpxData.toString(), (err) => {

          if (err) {

            // Error message
            console.log(err);
            console.log(":( The data is not added to file".red);

            resolve(false);

          } else {

            // Success message
            console.log(`:) The ${gpxName} is added to file`.green);

            resolve(true);
          }
        });
      } catch(error) {
          console.log(':( appendDataToFile error'.red);
          reject(console.log);
      }
  })
}

// Add data to file
exports.appendEndTag = async (paramsObj) => {
    return new Promise(async (resolve, reject) => {
      try {

        // Root path
        let rootAppPath = await exports.rootAppPath();

        // File link
        let fileLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}/${paramsObj.nameSingleGpxFile}.gpx`;

        // Add end tag to file
        fs.appendFile(fileLink, "</gpx>", (err) => {

          if (err) {

            // Error message
            console.log(err);
            console.log(":( The end tag is not added to file".red);

            resolve(false);

          } else {

            // Success message
            console.log(":) The end tag is added to file".green);

            resolve(true);
          }
        });
      } catch(error) {
          console.log(':( appendEndTag error'.red);
          reject(console.log);
      }
  })
}

// Format xml file, tab = optional indent value, default is tab (\t)
exports.formatXmlFile = async (xmlFile, tab) => {
    return new Promise(async (resolve, reject) => {
      try {

        // Params
        let formatted = '', indent= '';
        tab = tab || '\t';

        // Split
        let splitFile = xmlFile.split(/>\s*</);

        // Listing each splited parts
        splitFile.forEach((node) => {

          // Decrease indent by one 'tab'
          if (node.match( /^\/\w/ )) indent = indent.substring(tab.length);

          formatted += `${indent}<${node}>\r\n`;

          // Increase indent
          if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;

        });

        // Formatted file
        let formattedFile = formatted.substring(1, formatted.length-3);

        resolve(formattedFile);

      } catch(error) {
          console.log(':( formatXmlFile error'.red);
          reject(console.log);
      }
  })
}

// Process file composition
exports.processFile = async (paramsObj) => {
    return new Promise(async (resolve, reject) => {
      try {

        // Root path
        let rootAppPath = await exports.rootAppPath();

        // File link
        let fileLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}/${paramsObj.nameSingleGpxFile}.gpx`;

        // Generate an uique ID
        const crypto = require('crypto');
        const uuid = crypto.randomUUID();

        // New minified file link
        let newMinifiedFileLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}/${paramsObj.nameSingleGpxFile}_${uuid}.min.gpx`;

        // New  indented file link
        let newIndentedFileLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}/${paramsObj.nameSingleGpxFile}_${uuid}.gpx`;

        // Read file
        let data = fs.readFileSync(fileLink, 'utf-8');

        // Minify file
        let minifiedFile = data.replace(/\s\s+/g, '') // Remove spaces, tabs, empty lines
        minifiedFile = minifiedFile.replace(/(\r\n|\n|\r)/gm, ""); // Remove linebreaks

        // Format xml file
        let formattedFile = await exports.formatXmlFile(minifiedFile);

        // Rewrite minified file
        fs.writeFileSync(newMinifiedFileLink, minifiedFile, 'utf-8');

        // Rewrite indented file
        fs.writeFileSync(newIndentedFileLink, formattedFile, 'utf-8');

        // Delete worked file
        fs.unlinkSync(fileLink, formattedFile, 'utf-8');

        // Result object
        let obj = {minFile: minifiedFile.toString(), file: formattedFile.toString()};

        resolve(obj);

      } catch(error) {
          console.log(':( processFile error'.red);
          reject(console.log);
      }
  })
}

// Write a file
exports.writeFile = async (paramsObj, dataSting) => {
    return new Promise(async (resolve, reject) => {
        try {

          // Root path
          let rootAppPath = await exports.rootAppPath();

          // File link
          let fileLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}/${paramsObj.nameSingleGpxFile}.gpx`;

            // Write file
            fs.writeFile(fileLink, dataSting.toString(), (error) => {

              if (error) {

                // Error message
                console.log(`:( File ${paramsObj.nameDirectorySingleGpxFiles} not written`.red);
                console.log(error);

                resolve(false);

              } else {

                // Success message
                console.log(`:) File ${paramsObj.nameDirectorySingleGpxFiles} written`.green);

                resolve(true);
              }

            })
        } catch(error) {
            console.log(':( writeFile error'.red);
            reject(console.log);
        }
    })
}

// Check if directory is existing
exports.existDirectory = async (paramsObj) => {
    return new Promise(async (resolve, reject) => {
        try {

          // Root path
          let rootAppPath = await exports.rootAppPath();

          // New directory Link
          let resultDirectoryLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}`;

          // Check if the directory is already existing
          let resultDirectory = fs.existsSync(resultDirectoryLink, fs.F_OK);

          // If the results directory is not existing
          if (!resultDirectory) {

            // Message
            console.log(`:| ${paramsObj.nameDirectorySingleGpxFiles} directory not existing`.cyan);

            resolve(false);

          } else {

            // Message
            console.log(`:) ${paramsObj.nameDirectorySingleGpxFiles} directory existing`.green);

            resolve(true);

          }

        } catch(error) {
            console.log(':( existDirectory error'.red);
            reject(console.log);
        }
    })
}

// Create directory
exports.createDirectory = async (paramsObj) => {
    return new Promise(async (resolve, reject) => {
      try {

        // Root path
        let rootAppPath = await exports.rootAppPath();

        // Directory link
        let directoryLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}`;

        // Create the result directory
        fs.mkdir(directoryLink, (error) => {

          if (error) {

            // Error message
            console.log(`:( ${paramsObj.nameDirectorySingleGpxFiles} directory not created`.red);
            console.log(error)

            resolve(false);

          } else {

            // Success message
            console.log(`:) ${paramsObj.nameDirectorySingleGpxFiles} directory created`.green);

            resolve(true);

          }
        })
      } catch(error) {
          console.log(':( createDirectory error'.red);
          reject(console.log);
      }
  })
}

// File is existing
exports.existFile = async (paramsObj) => {
    return new Promise(async (resolve, reject) => {
      try {

        // Root path
        let rootAppPath = await exports.rootAppPath();

        // Single gpx file link
        let fileLink = `${rootAppPath}/${paramsObj.nameDirectorySingleGpxFiles}/${paramsObj.nameSingleGpxFile}.gpx`;

        // Check file
        fs.access(fileLink, fs.F_OK, (error) => {

          if (error) {

            // Error message
            console.log(`:| ${paramsObj.nameSingleGpxFile} file not existing`.cyan);

            resolve(false);

          } else {

            // Success message
            console.log(`:) ${paramsObj.nameSingleGpxFile} file existing`.green);

            resolve(true);

          }
        })
      } catch(error) {
          console.log(':( existFile error'.red);
          reject(console.log);
      }
  })
}

// Write the single gpx result file
exports.writeSingleGpxFile = async (paramsObj, dataSting) => {
    return new Promise(async (resolve, reject) => {
        try {

          // Check if the directory exists
          let resultDirectory = await exports.existDirectory(paramsObj);

          // Result directory exists
          if (resultDirectory) {

            // Check if file exists
            let existFile = await exports.existFile(paramsObj);

            // File is not existing
            if (!existFile) {

              // Write file
              let writtenFile = await exports.writeFile(paramsObj, dataSting);

              // If file written
              if (writtenFile) {

                resolve(true);

              }
            } else {

              resolve(true);

            }

          } else {

            // Create result directory
            let createDirectory = await exports.createDirectory(paramsObj);

            if (createDirectory) {

              // Write file
              let writtenFile = await exports.writeFile(paramsObj, dataSting);

              if (writtenFile) {

                resolve(true);

              }

            } else {

              resolve(false);
            }

          }
        } catch(error) {
            console.log(':( writeSingleGpxFile error'.red);
            reject(console.log);
        }
    })
}

// Write metadata
exports.writeMetaDataGpxFile = async (paramsObj, metaDataObj) => {
    return new Promise(async (resolve, reject) => {
        try {
          // Meta data
          const metaDataGpxFile = `
          <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
          <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" creator="${metaDataObj.nameCreatorGpxFile}">
          <metadata>
              <name>${metaDataObj.nameTrackGpxFile}</name>
              <desc>${metaDataObj.descriptionTrackGpxFile}</desc>
                  <author>${metaDataObj.authorTrackGpxFile}</author>
                  <copyright>${metaDataObj.licenseTrackGpxFile}</copyright>
                  <time>${metaDataObj.timeTrackGpxFile}</time>
                  <keywords>${metaDataObj.keywordsTrackGpxFile}</keywords>
              </metadata>`

          // Write file
          let writtenMetatdata = await exports.writeSingleGpxFile(paramsObj, metaDataGpxFile);

          if (writtenMetatdata) {

            console.log(":) Metadata written to file successfully".green);
            resolve(true);

          } else {

            console.log(":( Metadata not written to file".red);
            resolve(false);

          }

        } catch(error) {
            console.log(':( writeMetaDataGpxFile error'.red);
            reject(console.log);
        }
    })
}

// Get all filenames from a directory
exports.getAllGpxFilenamesDirectory = async  (paramsObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Params
        var resultArray = [];

        // Root path
        let rootAppPath = await exports.rootAppPath();

        // Files path link
        let filesPathLink = `${rootAppPath}/${paramsObj.nameDirectoryGpxFiles}`;

        // Read directory
        fs.readdir(filesPathLink, (error, filesArray) => {

          // Error
          if (error) {
            return console.log(`:( Unable to scan directory: ${error}`.red);
          }

          // Check if there are gpx files
          if (filesArray.length !== 0) {

            // Listing all files
            filesArray.sort().map((fileName, i) => {

              // Get filename only
              let name = fileName.substring(0, fileName.length - ".gpx".length);

              // Obj
              let obj = {id: i, name: name};

              // Record
              resultArray.push(obj);

              // End
              if (i + 1 === filesArray.length) {

                // Sort array of objects by id
                resultArray = resultArray.sort((a, b) => (a.id > b.id) ? 1 : -1);

                resolve(resultArray);
              }
            });
          } else {
            resolve([]);
          }
        });
      } catch (error) {
        console.error(":( getAllGpxFilenamesDirectory error".red);
        reject(console.log);
      }
    });
  }

// Merge multiple gpx files
exports.splitGpxFiles = async (paramsObj, gpxNameObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Root path
        let rootAppPath = await exports.rootAppPath();

        // File link
        let fileLink = `${rootAppPath}/${paramsObj.nameDirectoryGpxFiles}/${gpxNameObj.name}.gpx`;

        // Read file
        let gpxFileStr = fs.readFileSync(fileLink, paramsObj.encodageGpxFile);

        // Count tracks
        let trkCount = gpxFileStr.match(/<trk>/g).length;

        // While loop params
        let i = 0;
        let resultArray = [];

        while (i < trkCount) {

          // Number of total characters
          let totalGpxStr = gpxFileStr.length;

          // Slice str to each <trk></trk> segment
          let trkPosition = gpxFileStr.indexOf("<trk>");
          let trkLastPosition = gpxFileStr.indexOf("</trk>") + "</trk>".length;
          let trkStr = gpxFileStr.substring(trkPosition, trkLastPosition);

          // Check if <trk></trk> segment is existing
          if (trkPosition > 0) {

              // Redefine the native string
              gpxFileStr = gpxFileStr.substring(trkLastPosition, totalGpxStr);

              // Record
              resultArray.push(trkStr);
          }

          // Incrementation
          i++;
        }

        resolve(resultArray);

      } catch (error) {
        console.error(":( splitGpxFiles error".red);
        reject(console.log);
      }
    });
  }