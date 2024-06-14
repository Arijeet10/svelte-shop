export async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function fetchProductsByCategory(category: string) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function fetchProductById(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
}
