import { Currency, PaymentMethod } from 'src/common/enum';
export declare class CreatePaymentDto {
    method: PaymentMethod;
    amount: number;
    currency: Currency;
    exchangeRate?: number;
    originalAmount?: number;
    receivedAt?: Date;
    receivedBy?: string;
    bankId?: string;
    chequeNumber?: string;
    chequeDueDate?: Date;
    chequeStatus?: string;
    voucherId: string;
}
