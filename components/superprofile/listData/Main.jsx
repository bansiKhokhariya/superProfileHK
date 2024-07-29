
'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import TableView from '@/components/superprofile/listData/TableView'
import CardView from '@/components/superprofile/listData/CardView'
import { Button } from '@/components/ui/button'

const Main = () => {
    const [dataView, setDataView] = useState('card');
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('published');
    const [counts, setCounts] = useState({ published: 0, unpublished: 0, draft: 0 });
    const [totalSale, setTotalSale] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setDataView('card')
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/superProfile/DigitalPaymentProduct/Createupdate'); // Adjust the endpoint if necessary
            const data = await response.json();
            setProducts(data.products);

            // Calculate total sale and revenue
            const saleSum = data.products.reduce((acc, product) => acc + parseFloat(product.sale || 0), 0);
            const revenueSum = data.products.reduce((acc, product) => acc + parseFloat(product.revenue || 0), 0);

            setTotalSale(saleSum);
            setTotalRevenue(revenueSum);

            // Calculate counts
            const publishedCount = data.products.filter(product => product.isPublish === true && product.isDraft === true).length;
            const unpublishedCount = data.products.filter(product => product.isPublish === false && product.isDraft === true).length;
            const draftCount = data.products.filter(product => product.isDraft === false).length;
            setCounts({ published: publishedCount, unpublished: unpublishedCount, draft: draftCount });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to filter products based on selected filter
    const getFilteredProducts = () => {
        if (filter === 'published') {
            return products.filter(product => product.isPublish === true && product.isDraft === true);
        } else if (filter === 'unpublished') {
            return products.filter(product => product.isPublish === false && product.isDraft === true);
        } else {
            return products.filter(product => product.isDraft === false);
        }
    };

    const handleShare = async (productId) => {
        try {
            await navigator.share({
                title: 'Check out this product!',
                text: 'Visit this link to see more details.',
                url: `${window.location.origin}/vp/${productId}`
            });
        } catch (error) {
            console.error('Error sharing link:', error);
        }
    };

    return (
        <>
            <div>
                <div className="mb-8 h-60 shadow-lg bg-indigo-200 flex items-center justify-center">
                    <h1 className="text-3xl sm:text-4xl font-bold ">Payment Page</h1>
                    <Link href={'/create-payment-page'}>
                        <Button className="absolute top-8 right-8 hidden sm:block">Create Payment Page</Button>
                        <Button className="absolute top-20 right-8 block sm:hidden font-bold">+</Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-8 -mt-0 md:-mt-20">
                    <div className="bg-white p-6 rounded-lg border shadow-md border-b-4 border-indigo-500">
                        <h2 className="text-xs text-gray-500">TOTAL SALE &#128712;</h2>
                        <p className="flex gap-2 items-center text-xl sm:text-2xl font-bold mt-2">{totalSale}<span className="text-xs font-medium text-gray-500">same as last week</span> </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-md border-b-4 border-indigo-500">
                        <h2 className="text-xs text-gray-500">TOTAL REVENUE &#128712;</h2>
                        <p className="flex gap-2 items-center text-xl sm:text-2xl  font-bold mt-2">₹{totalRevenue}<span className="text-xs font-medium text-gray-500">same as last week</span> </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-md border-b-4 border-indigo-500">
                        <h2 className="text-xs text-gray-500">TOTAL CONVERSION &#128712;</h2>
                        <p className="flex gap-2 items-center text-xl sm:text-2xl  font-bold mt-2">1%<span className="text-xs font-medium text-gray-500">same as last week</span> </p>
                    </div>
                </div>
                <div className="flex gap-2 mb-4 px-8">
                    <Button variant={filter === 'published' ? 'default' : 'outline'} onClick={() => setFilter('published')}>Published ({counts.published})</Button>
                    <Button variant={filter === 'unpublished' ? 'default' : 'outline'} onClick={() => setFilter('unpublished')}> Unpublished ({counts.unpublished})</Button>
                    <Button variant={filter === 'draft' ? 'default' : 'outline'} onClick={() => setFilter('draft')}>Draft ({counts.draft})</Button>
                    <div className="gap-2  rounded-lg  hidden sm:flex">
                        <Button size="sm" className="font-bold" variant={dataView === 'table' ? 'default' : 'outline'} onClick={() => setDataView('table')}>☰</Button>
                        <Button size="sm" className="font-bold" variant={dataView === 'card' ? 'default' : 'outline'} onClick={() => setDataView('card')}>☷</Button>
                    </div>
                </div>
                {dataView === 'table' ? <TableView handleShare={handleShare} products={getFilteredProducts()} fetchProducts={fetchProducts} />
                    :
                    <CardView products={getFilteredProducts()} handleShare={handleShare} fetchProducts={fetchProducts} />
                }
            </div>
        </>
    )
}

export default Main
