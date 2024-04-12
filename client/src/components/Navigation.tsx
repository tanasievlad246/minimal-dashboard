import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export const Navigation = () => {
    const menuItems = [,
        {
            name: 'Invoices',
            path: '/invoices'
        },
        {
            name: 'Bills',
            path: '/bills'
        },
        {
            name: 'Expenses',
            path: '/expenses'
        },
        {
            name: 'Reports',
            path: '/reports'
        }
    ]
    return <div className="flex flex-col col-span-2 items-center text-slate-600 text-xl px-10 py-5">
        <div className="flex items-center justify-center font-extrabold text-slate-400 bg-white p-4 rounded-lg w-full h-20 text-center">
            <h1>LOGO</h1>
        </div>
        <div className="my-10 self-start w-full">
            <div className="justify-self-start">Menu</div>
            <div className="flex flex-col w-full p-4">
                <Link to="/" className="flex w-full items-center justify-between p-2 hover:bg-primary-500 rounded-lg">
                    <span>Home</span>
                </Link>
                {menuItems.map((item, index) => {
                    return <Link to={item.path} key={index} className="flex w-full items-center p-2 hover:bg-primary-500 rounded-lg">
                        <FontAwesomeIcon icon={faChevronRight} />
                        <span className="ml-6">{item.name}</span>
                    </Link>
                })}
            </div>
        </div>
    </div>
}