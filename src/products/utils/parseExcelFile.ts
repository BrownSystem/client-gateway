import * as XLSX from 'xlsx';
import { CreateProductDto } from '../dto/create-product.dto';

export const parseExcelFile = (buffer: Buffer): CreateProductDto[] => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const rows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  const products: CreateProductDto[] = rows.map((row) => {
    const product: CreateProductDto = {
      code: String(row['CODARTI'] ?? '').trim(),
      description: String(row['DESCRIP'] ?? '').trim(),
    };

    return product;
  });

  return products;
};
