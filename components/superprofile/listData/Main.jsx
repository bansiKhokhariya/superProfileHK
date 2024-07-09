'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import TableView from '@/components/superprofile/listData/TableView'
import CardView from '@/components/superprofile/listData/CardView'

const Main = () => {

    const [dataView, setDataView] = useState('card');
    const [products, setProducts] = useState([]);


    const handleResize = () => {
        if (window.innerWidth < 720) {
            setDataView('card')
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/superProfile/DigitalPaymentProduct/Createupdate'); // Adjust the endpoint if necessary
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div>
                <div className="relative mb-8 h-60 bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center z-0">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">Payment Page</h1>
                    <Link href={'/create-payment-page'}>
                        <button className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-900 border border-blue-400 focus:outline-none  rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hidden sm:block">Create Payment Page</button>
                        <button className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-900 border border-blue-400 focus:outline-none rounded-full text-4xl px-2.5 pb-1 me-2 mb-2 block sm:hidden">+</button>
                    </Link>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-8 -mt-0 md:-mt-20 relative md:absolute">
                    <div className="bg-white p-6 rounded-lg border shadow-md">
                        <h2 className="text-xs text-gray-500">TOTAL SALE &#128712;</h2>
                        <p className="flex gap-2 items-center text-xl sm:text-2xl font-bold mt-2">12<span className="text-xs font-medium text-gray-500">same as last week</span> </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-md">
                        <h2 className="text-xs text-gray-500">TOTAL REVENUE &#128712;</h2>
                        <p className="flex gap-2 items-center text-xl sm:text-2xl  font-bold mt-2">₹3384<span className="text-xs font-medium text-gray-500">same as last week</span> </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-md">
                        <h2 className="text-xs text-gray-500">TOTAL CONVERSION &#128712;</h2>
                        <p className="flex gap-2 items-center text-xl sm:text-2xl  font-bold mt-2">1%<span className="text-xs font-medium text-gray-500">same as last week</span> </p>
                    </div>
                </div>
                <div className="flex gap-2 mb-4 mt-0 md:mt-20 px-8">
                    <button className="bg-black text-white px-4 py-2 rounded-lg hover:shadow-2xl text-xs sm:text-sm">Published (7)</button>
                    <button className="border text-black px-4 py-2 rounded-lg hover:bg-gray-200 text-xs sm:text-sm">Unpublished (1)</button>
                    <button className="border text-black px-4 py-2 rounded-lg hover:bg-gray-200 text-xs sm:text-sm">Draft (3)</button>
                </div>
                <div className="flex justify-between items-center gap-2 mb-4 px-8 ">
                    <input type="text" placeholder="Search" className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 ring-blue-400" />
                    <div className="flex gap-2">
                        <button className="border text-black rounded-lg hover:bg-gray-200 btn-sm">Filter</button>
                        <button className="border text-black rounded-lg hover:bg-gray-200 btn-sm">Sort</button>
                        <button className="border text-black rounded-lg hover:bg-gray-200 btn-sm">Export</button>
                        <div className="gap-2 border p-1 hidden sm:flex">
                            <button
                                className={`px-2 border ${dataView === 'table' ? 'bg-gray-200' : ''}`}
                                onClick={() => setDataView('table')}
                            >
                                ☰
                            </button>
                            <button
                                className={`px-2 border ${dataView === 'card' ? 'bg-gray-200' : ''}`}
                                onClick={() => setDataView('card')}
                            >
                                ☷
                            </button>
                        </div>
                    </div>
                </div>
                {dataView === 'table' ? <TableView products={products}/> : <CardView products={products}/>}
            </div>
        </>
    )
}

export default Main