import * as XLSX from 'xlsx';
import { CreateProductDto } from '../dto/create-product.dto';

export const parseExcelFile = (buffer: Buffer): CreateProductDto[] => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // 1) Obtener los datos como array de arrays (sin cabeceras)
  const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1, // devuelve cada fila como array de celdas
    defval: '', // las celdas vacías vendrán como ''
  });

  // 2) Aplanar todas las filas en un solo array de celdas
  const cells = rows.flat();

  // 3) Filtrar strings vacíos y recortar espacios
  const descriptions = cells
    .map((cell) => String(cell).trim())
    .filter((text) => text.length > 0);

  // 4) Mapear a tu CreateProductDto
  const products: CreateProductDto[] = descriptions.map((description) => ({
    description,
  }));

  return products;
};
