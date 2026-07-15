import './ProductRow.css';

export function ProductRow({ image, name, sku, category, quantity, price, status }) {
  const statusClass =
    status === 'In Stock' ? 'statusInStock' :
    status === 'Low Stock' ? 'statusLowStock' : 'statusOutOfStock';

  return (
    <div className='productRow'>
      <div className='col colThumbnail'>
        <img src={image} alt={name} />
      </div>
      <div className='col colName'>{name}</div>
      <div className='col colSku'>{sku}</div>
      <div className='col colCategory'>{category}</div>
      <div className='col colQuantity'>{quantity}</div>
      <div className='col colPrice'>${price}</div>
      <div className='col colStatus'>
        <span className={`statusBadge ${statusClass}`}>{status}</span>
      </div>
      <div className='col colActions'>
        <button className='actionBtn'>Edit</button>
        <button className='actionBtn'>Delete</button>
      </div>
    </div>
  );
}
