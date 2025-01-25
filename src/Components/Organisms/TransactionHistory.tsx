import { Transaction } from "../../Type/Transaction";
import Box from "../Atoms/Box";

const TransactionHistory = ({transactionHistory, loading, limit, setOffset}: {transactionHistory: Transaction[], loading: boolean, limit: number, setOffset: (offset: (prevOffset: number) => number) => void}) => {
    const handleShowMore = () => {
      setOffset((prevOffset: number) => prevOffset + limit);
    };
    return (
        <Box>
            <h1 className="text-lg font-semibold">Semua Transaksi</h1>
            {transactionHistory.map((transaction: Transaction) => {
              const isoDate = transaction.created_on;
              const date = new Date(isoDate);
              const options: Intl.DateTimeFormatOptions = { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                timeZone: 'UTC' 
              };
              const formattedDate = date.toLocaleDateString('id-ID', options);
              
              return (
                <Box key={transaction.invoice_number} className="w-full border border-gray-300 my-4 flex flex-row justify-between p-4 rounded-md">
                    <Box className="flex flex-col justify-between">
                        {transaction.transaction_type === "TOPUP" ? (
                            <p className="text-green-500 text-2xl font-semibold">+ {transaction.total_amount.toLocaleString()}</p>
                        ) : (
                            <p className="text-red-500 text-2xl font-semibold">- {transaction.total_amount.toLocaleString()}</p>
                        )}
                        <p>{formattedDate}</p>
                    </Box>
                    <Box className="flex flex-col justify-center">
                        <p>{transaction.description}</p>
                    </Box>
                </Box>
              );
            })}
            {transactionHistory.length > 0 && !loading && (
                <a className="flex justify-center cursor-pointer mb-4 text-red-500 font-semibold" onClick={handleShowMore}>Show More</a>
            )}
        </Box>
    )
}

export default TransactionHistory