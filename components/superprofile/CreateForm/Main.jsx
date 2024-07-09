'use client';
import React, { useState, useEffect } from 'react';
import SelectCreatePage from '@/components/superprofile/CreateForm/SelectCreatePage';
import CreateForm from '@/components/superprofile/CreateForm/CreateForm';


const Main = ({ productId }) => {
    const [continueBtn, setContinueBtn] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        if (productId) {
            setSelectedProduct('digitalProduct');
            setContinueBtn(true)
        }
    }, [productId]);




    return (
        <div style={{ height: "100dvh" }}>

            < div className={`${continueBtn ? 'hidden' : ''}`} style={{ height: "100dvh" }}>
                <SelectCreatePage setContinueBtn={setContinueBtn} continueBtn={continueBtn} setSelectedProduct={setSelectedProduct} />
            </div>

            <div className={`${continueBtn ? '' : 'hidden'}`} >
                {selectedProduct == "digitalProduct" && <CreateForm selectedProduct={selectedProduct} productId={productId}/>}
            </div>
        </div >
    );
};

export default Main;

