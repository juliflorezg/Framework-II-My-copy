import {normalizeProduct} from '@vercel/commerce-shopify/utils';

const NormalizeProduct = (products: any[]) => {
  return products.map(product => normalizeProduct(product.node));
};
export default NormalizeProduct;
