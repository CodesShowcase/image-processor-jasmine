"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("../controllers"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    let usage = '<b>Image Processing API</b> => Please access the correct endpoint';
    usage += '<p>"/api/view" => returns all available pictures in the folder</p>';
    usage +=
        '<p>"/api/view?file=name" => returns single picture (file - name)</p>';
    usage +=
        '<p>"/api/resize?file=name&width=pixel&height=pixel" => resizes single picture (file - name / width & height in pixel / resulting file - name-resized-width-height.jpg)</p>';
    usage +=
        '<p>"/api/greyscale?file=name" => recolors a single picture (file - name / resulting file - name-greyscale.jpg)</p>';
    usage +=
        '<b>Attention</b> - for all operations please use the filename without the filetype ending and it only works for .jpgs!';
    res.send(usage);
});
router.get('/api/view', controllers_1.default.showImages);
router.get('/api/resize', controllers_1.default.resizeImage);
router.get('/api/greyscale', controllers_1.default.greyscaleImage);
exports.default = router;
