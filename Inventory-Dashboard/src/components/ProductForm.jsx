import { useState } from 'react';
import { useNavigate } from 'react-router';
import './ProductForm.css';

const initialFormState = {
    productName: '',
    quantity: '',
    unitPrice: '',
    sku: '',
    supplier: '',
    category: '',
    description: '',
};

export function ProductForm({ onAddProduct }){
    const [formData, setFormData] = useState(initialFormState);
    const navigate = useNavigate();

    function handleChange(e){
        const name = e.target.name; 
        const value = e.target.value; 
        // const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e){
        e.preventDefault();
        onAddProduct({
            id: Date.now(),
            productName: formData.productName,
            sku: formData.sku,
            category: formData.category,
            quantity: Number(formData.quantity),
            unitPrice: Number(formData.unitPrice),
            supplier: formData.supplier,
            description: formData.description,
            createdAt: new Date().toISOString().slice(0, 10),
        });
        navigate('/Products');
    }

    function handleCancel(){
        navigate('/Products');
    }

    return(
        <form className='ProductForm' onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <p>Add a new product to your inventory system. All fields marked * are equired.</p>
            <div className='lineone'>
                <div className='formField'>
                    <label htmlFor='productName'>Product Name <span className='required'>*</span></label>
                    <input type='text' id='productName' name='productName' placeholder='Enter product name' value={formData.productName} onChange={handleChange} required />
                </div>
                <div className='formField'>
                    <label htmlFor='quantity'>Quantity <span className='required'>*</span></label>
                    <input type='number' id='quantity' name='quantity' placeholder='0' value={formData.quantity} onChange={handleChange} required />
                </div>
                <div className='formField'>
                    <label htmlFor='unitPrice'>Unit Price ($) <span className='required'>*</span></label>
                    <input type='number' id='unitPrice' name='unitPrice' placeholder='0.00' value={formData.unitPrice} onChange={handleChange} required />
                </div>
            </div>
            <div className='linetwo'>
                <div className='formField'>
                    <label htmlFor='sku'>SKU <span className='required'>*</span></label>
                    <input type='text' id='sku' name='sku' placeholder='Enter SKU' value={formData.sku} onChange={handleChange} required />
                </div>
                <div className='formField'>
                    <label htmlFor='supplier'>Supplier</label>
                    <input type='text' id='supplier' name='supplier' placeholder='Enter supplier' value={formData.supplier} onChange={handleChange} />
                </div>
            </div>
            <div className='linethree'>
                <div className='formField'>
                    <label htmlFor='category'>Category <span className='required'>*</span></label>
                    <select id='category' name='category' value={formData.category} onChange={handleChange} required>
                        <option value=''>Select category</option>
                        <option value='electronics'>Electronics</option>
                        <option value='clothing'>Clothing</option>
                        <option value='groceries'>Groceries</option>
                        <option value='furniture'>Furniture</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
            </div>
            <div className='linefour'>
                <div className='formField'>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description' name='description' placeholder='Enter product description' rows='6' value={formData.description} onChange={handleChange}></textarea>
                </div>
            </div>
            <div className='buttons'>
                <button type='button' className='cancelBtn' onClick={handleCancel}>Cancel</button>
                <button type='submit' className='saveBtn'>Save Product</button>
            </div>
        </form>
    );
}
