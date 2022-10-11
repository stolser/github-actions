/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 995:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 130:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 292:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(995)
const github = __nccwpck_require__(130)
const fs = __nccwpck_require__(147);
const {readdir} = __nccwpck_require__(292);
const path = __nccwpck_require__(17);

const findByExtension = async (dir, ext) => {
    const matchedFiles = [];
    const allFilesInDir = await readdir(dir);

    console.log(`allFilesInDir = ${allFilesInDir}`)

    for (const file of allFilesInDir) {
        const fileExt = path.extname(file);

        if (fileExt === `.${ext}`) {
            matchedFiles.push(file);
        }
    }

    return matchedFiles;
};


try {
    // get input params defined in action.yaml
    let dirPath = core.getInput('dir-path');
    let fileExt = core.getInput('file-ext');

    findByExtension(dirPath, fileExt)
        .then((matchedFiles) => {
            let totalNumberOfLinks = 0;

            console.log(`matchedFiles = ${matchedFiles}`);

            for (const file of matchedFiles) {
                const allContents = fs.readFileSync(file, 'utf-8');

                console.log(`=== Links found in file '${file}' ===`);

                let numberOfLinks = 0;
                let currentLineNumber = 1;
                allContents.split(/\r?\n/).forEach((line) => {
                    if (line.includes("http://") || line.includes("https://")){
                        numberOfLinks++;
                        if (numberOfLinks <= 10) {
                            console.log(`line ${currentLineNumber}: `, line);
                        }
                    }
                    currentLineNumber++;
                });
                totalNumberOfLinks = totalNumberOfLinks + numberOfLinks;
                console.log(`Total number of links in '${file}': `, numberOfLinks);
            }

            core.setOutput("total-number", totalNumberOfLinks);
        });

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;