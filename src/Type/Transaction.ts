export interface Transaction {
    invoice_number: string;
    transaction_type: string;
    description: string;
    total_amount: number;
    created_on: string;
  }
  
  export interface TransactionsProps {
    transactions: Transaction[];
  }