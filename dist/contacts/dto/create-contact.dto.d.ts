import { ContactType, DocumentType, IvaCondition } from '../enum';
export declare class CreateContactDto {
    branchId: string;
    name: string;
    businessName?: string;
    ivaCondition: IvaCondition;
    documentType: DocumentType;
    documentNumber: string;
    available: boolean;
    phone?: string;
    email?: string;
    address?: string;
    type: ContactType;
}
