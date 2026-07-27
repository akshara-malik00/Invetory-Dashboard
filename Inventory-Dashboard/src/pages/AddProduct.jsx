import { useParams } from "react-router";
import { ProductForm } from "../components/ProductForm";

export function AddProduct({ products, onAddProduct, onUpdateProduct }) {
  const { id } = useParams();
  const initialData = id ? products?.find((product) => product.id === Number(id)) : undefined;

  return (
    <>
      <ProductForm onAddProduct={onAddProduct} onUpdateProduct={onUpdateProduct} initialData={initialData} />
    </>
  );
}
