/* base de API */
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com';

/* rutas de API */
export const API_ROOTS = {
  auth: `${API_BASE_URL}/auth`,
  users: `${API_BASE_URL}/users`,
  products: `${API_BASE_URL}/products`,
  carts: `${API_BASE_URL}/carts`,
};

/* endpoints de API */
export const ENDPOINTS = {
  auth: {
    login: `${API_ROOTS.auth}/login`,
  },
  products: {
    list: API_ROOTS.products,
    categories: `${API_ROOTS.products}/categories`,
    byCategory: (category) => `${API_ROOTS.products}/category/${encodeURIComponent(category)}`,
    detail: (id) => `${API_ROOTS.products}/${id}`,
    create: API_ROOTS.products,
    update: (id) => `${API_ROOTS.products}/${id}`,
    remove: (id) => `${API_ROOTS.products}/${id}`,
  },
  carts: {
    list: API_ROOTS.carts,
    byUser: (userId) => `${API_ROOTS.carts}/user/${userId}`,
    detail: (id) => `${API_ROOTS.carts}/${id}`,
    create: API_ROOTS.carts,
    update: (id) => `${API_ROOTS.carts}/${id}`,
    remove: (id) => `${API_ROOTS.carts}/${id}`,
  },
  users: {
    list: API_ROOTS.users,
    detail: (id) => `${API_ROOTS.users}/${id}`,
    create: API_ROOTS.users,
    update: (id) => `${API_ROOTS.users}/${id}`,
    remove: (id) => `${API_ROOTS.users}/${id}`,
  },
};

export const STORAGE_KEYS = {
  authToken: "auth_token",
  authUser: "auth_user",
  purchaseHistory: "purchase_history",
};

export default {
  API_BASE_URL,
  API_ROOTS,
  ENDPOINTS,
  STORAGE_KEYS,
};
