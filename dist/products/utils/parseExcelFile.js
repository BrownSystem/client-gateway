"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExcelFile = void 0;
const XLSX = require("xlsx");
const parseExcelFile = (buffer) => {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    const products = rows.map((row) => {
        const product = {
            code: String(row['CODARTI'] ?? '').trim(),
            description: String(row['DESCRIP'] ?? '').trim(),
        };
        return product;
    });
    return products;
};
exports.parseExcelFile = parseExcelFile;
//# sourceMappingURL=parseExcelFile.js.map