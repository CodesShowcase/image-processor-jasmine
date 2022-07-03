"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseController = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class baseController {
    showImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.query.file;
            if (!file) {
                const dirPath = './images';
                const fileArr = [];
                fs_1.default.readdir(dirPath, (err, files) => {
                    files.forEach((element) => {
                        if (path_1.default.extname(element) == '.jpg') {
                            fileArr.push(' ' + element);
                        }
                    });
                    res.status(200).send(`The following files are available: ${fileArr}`);
                    if (err) {
                        res.status(400).send('Could not scan directory');
                    }
                });
            }
            else {
                try {
                    const inFile = `./images/${file}.jpg`;
                    if (fs_1.default.existsSync(inFile)) {
                        res.status(200).sendFile(inFile, { root: `${process.cwd()}` });
                    }
                    else {
                        res.status(400).send('File does not exist');
                    }
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }
        });
    }
    resizeImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.query.file;
            const width = parseInt(req.query.width);
            const height = parseInt(req.query.height);
            const inFile = `./images/${file}.jpg`;
            const outFile = `./images/resized/${file}-${width}-${height}.jpg`;
            if (!file || !width || !height) {
                res
                    .status(400)
                    .send('Parameters are missing => /api/resize?file=name&width=pixel&height=pixel');
            }
            else {
                try {
                    if (fs_1.default.existsSync(inFile)) {
                        if (!fs_1.default.existsSync(outFile)) {
                            fs_1.default.readFile(inFile, (err, data) => {
                                (0, sharp_1.default)(data)
                                    .resize(width, height)
                                    .toFile(outFile)
                                    .then(() => {
                                    res
                                        .status(200)
                                        .sendFile(outFile, { root: `${process.cwd()}` });
                                });
                                console.log('The file was resized');
                            });
                        }
                        else {
                            res.status(200).sendFile(outFile, { root: `${process.cwd()}` });
                            console.log('The file already exists');
                        }
                    }
                    else {
                        res.status(400).send('Sourcefile does not exist');
                    }
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }
        });
    }
    greyscaleImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.query.file;
            const inFile = `./images/${file}.jpg`;
            const outFile = `./images/greyscaled/${file}.jpg`;
            if (!file) {
                res.status(400).send('Parameters are missing => /api/greyscale?file=name');
            }
            else {
                try {
                    if (fs_1.default.existsSync(inFile)) {
                        if (!fs_1.default.existsSync(outFile)) {
                            fs_1.default.readFile(inFile, (err, data) => {
                                (0, sharp_1.default)(data)
                                    .greyscale()
                                    .toFile(outFile)
                                    .then(() => {
                                    res
                                        .status(200)
                                        .sendFile(outFile, { root: `${process.cwd()}` });
                                });
                                console.log('The file was greyscaled');
                            });
                        }
                        else {
                            res.status(200).sendFile(outFile, { root: `${process.cwd()}` });
                            console.log('The file already exists');
                        }
                    }
                    else {
                        res.status(400).send('Sourcefile does not exist');
                    }
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }
        });
    }
}
exports.baseController = baseController;
exports.default = new baseController();
