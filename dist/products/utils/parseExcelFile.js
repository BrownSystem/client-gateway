"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExcelFile = void 0;
const XLSX = require("xlsx");
const parseExcelFile = (buffer) => {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: '',
    });
    const cells = rows.flat();
    const descriptions = cells
        .map((cell) => String(cell).trim())
        .filter((text) => text.length > 0);
    const products = descriptions.map((description) => ({
        description,
    }));
    return products;
};
exports.parseExcelFile = parseExcelFile;
//# sourceMappingURL=parseExcelFile.js.map