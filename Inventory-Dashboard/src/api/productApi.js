import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

// How many products to pull on load. DummyJSON has 194 products across 24
// categories; 100 gives a realistic, varied inventory without paginating
// through more than needed for a demo dashboard.
const PRODUCT_FETCH_LIMIT = 100;

// DummyJSON category slugs (e.g. "mobile-accessories") -> the label the UI
// shows (e.g. "Mobile Accessories"). This happens to match DummyJSON's own
// human-readable category names one-for-one.
function formatCategoryLabel(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Maps a DummyJSON product into this app's product shape, so every
// component downstream (ProductTable, ProductForm, Analytics, etc.) keeps
// working against the same fields it always has.
function toAppProduct(dummyProduct) {
  return {
    id: dummyProduct.id,
    productName: dummyProduct.title,
    sku: dummyProduct.sku ?? "",
    category: formatCategoryLabel(dummyProduct.category),
    quantity: dummyProduct.stock,
    unitPrice: dummyProduct.price,
    supplier: dummyProduct.brand || "Unknown",
    description: dummyProduct.description ?? "",
    thumbnail: dummyProduct.thumbnail,
    createdAt: (dummyProduct.meta?.createdAt ?? new Date().toISOString()).slice(
      0,
      10,
    ),
  };
}

// Maps this app's product shape back into the fields DummyJSON's write
// endpoints expect.
function toDummyPayload(product) {
  return {
    title: product.productName,
    sku: product.sku,
    category: product.category,
    price: product.unitPrice,
    stock: product.quantity,
    brand: product.supplier,
    description: product.description,
    thumbnail: product.thumbnail,
  };
}

export async function getProducts() {
  const response = await axios.get(BASE_URL, {
    params: { limit: PRODUCT_FETCH_LIMIT },
  });
  return response.data.products.map(toAppProduct);
}

export async function addProduct(product) {
  const response = await axios.post(`${BASE_URL}/add`, toDummyPayload(product));
  // DummyJSON's mock "add" doesn't persist the product or echo back every
  // field we sent (it drops sku, for example), so the data the user
  // entered stays the source of truth here — we only take the id it issued.
  return { ...product, id: response.data.id };
}

export async function updateProduct(id, product) {
  try {
    await axios.put(`${BASE_URL}/${id}`, toDummyPayload(product));
  } catch (error) {
    // DummyJSON only recognizes its ~194 seeded product ids. A product
    // added earlier in this session got an id back from POST /add, but
    // that id was never actually persisted server-side, so PUT 404s for
    // it — expected for this mock, not a real failure. Any other error
    // (network issue, 5xx) still propagates.
    if (error.response?.status !== 404) throw error;
  }
  // DummyJSON simulates the update but doesn't persist it either way, so
  // the locally-edited product (with this id) is authoritative.
  return { ...product, id };
}

export async function deleteProduct(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    // Same reasoning as updateProduct: deleting a session-added product
    // 404s because DummyJSON never actually stored it.
    if (error.response?.status !== 404) throw error;
  }
  return id;
}
