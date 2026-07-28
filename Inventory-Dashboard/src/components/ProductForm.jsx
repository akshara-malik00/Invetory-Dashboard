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
    thumbnail:''
};

// Matches the category values used across the app (SearchFilters, product data)
// so a product added here can actually be found by the category filter.
const CATEGORY_OPTIONS = [
    'Tablets',
    'Phones',
    'Laptops',
    'Audio',
    'Accessories',
    'Entertainment',
    'Wearables',
    'Smart Home',
];

const SKU_PATTERN = /^[A-Za-z0-9-]+$/;

function validate(formData, { products, currentId }) {
    const errors = {};

    if (!formData.productName.trim()) {
        errors.productName = 'Product name is required.';
    } else if (formData.productName.trim().length < 2) {
        errors.productName = 'Product name must be at least 2 characters.';
    }

    if (!formData.sku.trim()) {
        errors.sku = 'SKU is required.';
    } else if (!SKU_PATTERN.test(formData.sku.trim())) {
        errors.sku = 'SKU can only contain letters, numbers, and hyphens.';
    } else {
        const duplicate = products?.some(
            (product) =>
                product.id !== currentId &&
                product.sku.toLowerCase() === formData.sku.trim().toLowerCase()
        );
        if (duplicate) {
            errors.sku = 'This SKU is already in use by another product.';
        }
    }

    if (!formData.category) {
        errors.category = 'Please select a category.';
    }

    if (formData.quantity === '' || formData.quantity === null) {
        errors.quantity = 'Quantity is required.';
    } else if (!Number.isInteger(Number(formData.quantity)) || Number(formData.quantity) < 0) {
        errors.quantity = 'Quantity must be a whole number of 0 or more.';
    }

    if (formData.unitPrice === '' || formData.unitPrice === null) {
        errors.unitPrice = 'Unit price is required.';
    } else if (Number.isNaN(Number(formData.unitPrice)) || Number(formData.unitPrice) <= 0) {
        errors.unitPrice = 'Unit price must be a number greater than 0.';
    }

    if (!formData.supplier.trim()) {
        errors.supplier = 'Supplier is required.';
    }

    if (!formData.thumbnail) {
        errors.thumbnail = 'Please add a thumbnail image.';
    }

    return errors;
}

export function ProductForm({ onAddProduct, onUpdateProduct, initialData, products = [] }){
    const isEditing = Boolean(initialData);
    const [formData, setFormData] = useState(
        initialData
            ? {
                productName: initialData.productName,
                quantity: initialData.quantity,
                unitPrice: initialData.unitPrice,
                sku: initialData.sku,
                supplier: initialData.supplier ?? '',
                category: initialData.category,
                description: initialData.description ?? '',
                thumbnail: initialData.thumbnail,
            }
            : initialFormState
    );
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        // const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear a field's error as soon as the user edits it, rather than
        // waiting for the next full-form submit to re-validate.
        setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    }

    function handleFileChange(e){
        const file = e.target.files[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
        setErrors((prev) => (prev.thumbnail ? { ...prev, thumbnail: undefined } : prev));
    }

    function handleSubmit(e){
        e.preventDefault();

        const validationErrors = validate(formData, {
            products,
            currentId: initialData?.id,
        });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (isEditing) {
            onUpdateProduct({
                ...initialData,
                productName: formData.productName,
                sku: formData.sku,
                category: formData.category,
                quantity: Number(formData.quantity),
                unitPrice: Number(formData.unitPrice),
                supplier: formData.supplier,
                description: formData.description,
                thumbnail: formData.thumbnail,
            });
        } else {
            onAddProduct({
                id: Date.now(),
                productName: formData.productName,
                sku: formData.sku,
                category: formData.category,
                quantity: Number(formData.quantity),
                unitPrice: Number(formData.unitPrice),
                supplier: formData.supplier,
                description: formData.description,
                thumbnail: formData.thumbnail,
                createdAt: new Date().toISOString().slice(0, 10),
            });
        }
        navigate('/Products');
    }

    function handleCancel(){
        navigate('/Products');
    }

    return(
        <form className='ProductForm' onSubmit={handleSubmit} noValidate>
            <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
            <p>{isEditing ? 'Update the details of this product.' : 'Add a new product to your inventory system.'} All fields marked * are required.</p>
            <div className='lineone'>
                <div className='formField'>
                    <label htmlFor='productName'>Product Name <span className='required'>*</span></label>
                    <input type='text' id='productName' name='productName' placeholder='Enter product name' value={formData.productName} onChange={handleChange} className={errors.productName ? 'inputError' : ''} aria-invalid={Boolean(errors.productName)} />
                    {errors.productName && <span className='errorText'>{errors.productName}</span>}
                </div>
                <div className='formField'>
                    <label htmlFor='quantity'>Quantity <span className='required'>*</span></label>
                    <input type='number' id='quantity' name='quantity' placeholder='0' min='0' step='1' value={formData.quantity} onChange={handleChange} className={errors.quantity ? 'inputError' : ''} aria-invalid={Boolean(errors.quantity)} />
                    {errors.quantity && <span className='errorText'>{errors.quantity}</span>}
                </div>
                <div className='formField'>
                    <label htmlFor='unitPrice'>Unit Price (₹) <span className='required'>*</span></label>
                    <input type='number' id='unitPrice' name='unitPrice' placeholder='0.00' min='0' step='0.01' value={formData.unitPrice} onChange={handleChange} className={errors.unitPrice ? 'inputError' : ''} aria-invalid={Boolean(errors.unitPrice)} />
                    {errors.unitPrice && <span className='errorText'>{errors.unitPrice}</span>}
                </div>
            </div>
            <div className='linetwo'>
                <div className='formField'>
                    <label htmlFor='sku'>SKU <span className='required'>*</span></label>
                    <input type='text' id='sku' name='sku' placeholder='Enter SKU' value={formData.sku} onChange={handleChange} className={errors.sku ? 'inputError' : ''} aria-invalid={Boolean(errors.sku)} />
                    {errors.sku && <span className='errorText'>{errors.sku}</span>}
                </div>
                <div className='formField'>
                    <label htmlFor='supplier'>Supplier <span className='required'>*</span></label>
                    <input type='text' id='supplier' name='supplier' placeholder='Enter supplier' value={formData.supplier} onChange={handleChange} className={errors.supplier ? 'inputError' : ''} aria-invalid={Boolean(errors.supplier)} />
                    {errors.supplier && <span className='errorText'>{errors.supplier}</span>}
                </div>
            </div>
            <div className='linethree'>
                <div className='formField'>
                    <label htmlFor='category'>Category <span className='required'>*</span></label>
                    <select id='category' name='category' value={formData.category} onChange={handleChange} className={errors.category ? 'inputError' : ''} aria-invalid={Boolean(errors.category)}>
                        <option value=''>Select category</option>
                        {CATEGORY_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.category && <span className='errorText'>{errors.category}</span>}
                </div>
                <div className='formField thumbnail'>
                    <label htmlFor='thumbnail'>Add Thumbnail {!isEditing && <span className='required'>*</span>}</label>
                    <input id='thumbnail' name='thumbnail' type='file' accept='image/*' onChange={handleFileChange} className={errors.thumbnail ? 'inputError' : ''} aria-invalid={Boolean(errors.thumbnail)} />
                    {errors.thumbnail && <span className='errorText'>{errors.thumbnail}</span>}
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
                <button type='submit' className='saveBtn'>{isEditing ? 'Save Changes' : 'Save Product'}</button>
            </div>
        </form>
    );
}
