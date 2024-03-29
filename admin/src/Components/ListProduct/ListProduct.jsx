import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:5080/allproducts')
            .then((res) => res.json()).then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    const remove_product = async (id) => {
        try {
            await fetch('http://localhost:5080/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });
            await fetchInfo(); // Refresh the list of products after removal
        } catch (error) {
            console.error('Error removing product:', error);
        }
    }
    

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return <>
                        <div key={index} className="listproduct-format-main listproduct-format">
                            <img src={product.image} className='listproduct-product-icon' alt="" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={()=>{remove_product(product.id)}} className='listprouct-remove-icon' src={cross_icon} alt="" />
                        </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    )
}

export default ListProduct
