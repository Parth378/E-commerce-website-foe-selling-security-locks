// import React from 'react'
// import { Link } from 'react-router-dom';


// const ProductManagement = () => {
//     const products = [
//         {
//             _id: 123123,
//             name: "Mortise Lock",
//             price: 1110,
//             sku: "123123123",
//         },
//     ];

//     const handleDelete = (id) => {
//         if(window.confirm("Are you sure you want to delete the product?")){
//             console.log("Delete Product With id:", id);
//         }
//     }

//     return <div className="max-w-7xl mx-auto p-6">
//         <h2 className="text-2x1 font-bold mb-6">Product Management</h2>
//         <div className="overflow-x-auto shadow-md sm:rounded-lg">
//             <table className="min-w-full text-left text-gray-500">
//                 <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//                     <tr>
//                         <th className="py-3 px-4">Name</th>
//                         <th className="py-3 px-4">Price</th>
//                         <th className="py-3 px-4">SKU</th>
//                         <th className="py-3 px-4">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.length > 0 ? (
//                         products.map((product) => (
//                     <tr key={product._id}
//                     className="border-b hover:bg-gray-50 cursor-pointer"
//                     >
//                         <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
//                             {product.name}
//                         </td>
//                         <td className="p-4">₹{product.price}</td>
//                         <td className="p-4">{product.sku}</td>
//                         <td className="p-4">
//                             <Link to={`/admin/products/${product._id}/edit`}
//                             className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
//                                 Edit
//                             </Link>
//                             <button onClick = {() => handleDelete(product._id)}
//                                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
//                                 >
//                                 Delete
//                             </button>
//                         </td>
                        
//                     </tr>
//                 )) 
//             ) : (
//                 <tr>
//                     <td colSpan={4} className="p-4 text-center text-gray-500">
//                         No Products found.
//                     </td>
//                 </tr>
//             )}
//                 </tbody>
//             </table>
//         </div>
//     </div>;
// };
// export default ProductManagement;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:9000/api/products");
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete the product?")) {
            try {
                await axios.delete(`http://localhost:9000/api/products/${id}`);
                setProducts(products.filter((product) => product._id !== id));
            } catch (error) {
                alert("Failed to delete product");
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Product Management</h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Price</th>
                            {/* <th className="py-3 px-4">SKU</th> */}
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                        {product.name}
                                    </td>
                                    <td className="p-4">₹{product.price}</td>
                                    {/* <td className="p-4">{product.sku}</td> */}
                                    <td className="p-4">
                                        <Link to={`/admin/products/${product._id}/edit`}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No Products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
