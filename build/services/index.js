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
exports.resizeSharp = exports.greyscaleSharp = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
function greyscaleSharp(inFile, outFile) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sharp_1.default)(inFile).greyscale().toFile(outFile);
        if (fs_1.default.existsSync(outFile)) {
            return outFile;
        }
        else {
            return 'Error';
        }
    });
}
exports.greyscaleSharp = greyscaleSharp;
function resizeSharp(inFile, outFile, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sharp_1.default)(inFile).resize(width, height).toFile(outFile);
        if (fs_1.default.existsSync(outFile)) {
            return outFile;
        }
        else {
            return 'Error';
        }
    });
}
exports.resizeSharp = resizeSharp;
