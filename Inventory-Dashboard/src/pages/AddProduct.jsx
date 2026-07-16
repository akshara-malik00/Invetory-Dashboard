import { ProductForm } from "../components/ProductForm";
export function AddProduct({ onAddProduct }) {
  return (
    <>
      <ProductForm onAddProduct={onAddProduct} />
    </>
  );
}
