import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUserInvoices } from "../features/user-invoices";
import { stat } from "fs";

export const InvoicesTable = () => {
    const invoices = useAppSelector((state) => state.userInvoices.invoices);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserInvoices());
    }, []);

    useEffect(() => {
        console.log(invoices);
    }, [invoices]);

    const columns = [
        {
            name: 'Date',
            selector: 'created_at',
            selectable: true,
        },
        {
            name: 'Payee',
            selector: 'vendor_name',
        },
        {
            name: 'Description',
            selector: 'description',
        },
        {
            name: 'Due date',
            selector: 'due_date',
        },
        {
            name: 'Amount',
            selector: 'amount',
        },
        {
            name: 'Status',
            selector: 'paid',
        }
    ]

    const checkBoxClassName = "mr-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";

    return (
        <div className="overflow-y-scroll h-5/6 rounded-t-2xl">
            <table className="table h-full">
                {/* head */}
                <thead className="bg-primary-600 text-white text-lg">
                    <tr>
                        {columns.map((column, index) => {
                            if (column.selectable) {
                                return <th key={index}><input type="checkbox" className={checkBoxClassName} />{column.name}</th>
                            }
                            return <th key={index}>{column.name}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, index) => {
                        return (
                            <tr key={index}>
                                {columns.map((column, index) => {
                                    const {
                                        due_date,
                                        created_at,
                                        paid
                                    } = invoice;

                                    if (column.selector === 'paid') {
                                        return <td key={index}>{paid ? 'Paid' : 'Unpaid'}</td>
                                    }

                                    if (column.selectable) {
                                        if (column.selector === 'created_at') {
                                            console.log('created_at', created_at);
                                            const day = new Date(created_at).getDate();
                                            const month = new Date(created_at).getMonth();
                                            const year = new Date(created_at).getFullYear();
                                            return <td key={index}><input type="checkbox" className={checkBoxClassName} />{day}/{month}/{year}</td>
                                        }
                                        return <td key={index}><input type="checkbox" className={checkBoxClassName} />{invoice[column.selector]}</td>
                                    }

                                    if (column.selector === 'due_date') {
                                        const day = new Date(due_date).getDate();
                                        const month = new Date(due_date).getMonth();
                                        const year = new Date(due_date).getFullYear();
                                        return <td key={index}>{day}/{month}/{year}</td>
                                    }



                                    return <td key={index}>{invoice[column.selector]}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
