import {
    CurrencyCode,
    Money,
    Item,
    SearchResponse,
    CommertialOffer,
    VtexProduct,
  } from '../../../utils/vtexProduct';
  
  const getDiscount = (commertialOffer: CommertialOffer) => {
    const baseAmount = Number(commertialOffer.ListPrice);
    const amount = Number(commertialOffer.PriceWithoutDiscount);
    const hasDiscount = baseAmount > amount;
    if (hasDiscount) {
      return Math.round(((baseAmount - amount) / baseAmount) * 100);
    } else {
      return '0';
    }
  };
  
  const parseSkuValues = (values: string[]) => {
    const valuesSku = values.map(val => {
      if (val.startsWith('#')) {
        return {
          label: val,
          hexColors: val,
        };
      } else {
        return {label: val};
      }
    });
    return valuesSku;
  };
  
  const parseProductOption = (option: any) => {
    const variations = option?.variations.map((sku: any) => {
      return {
        id: sku?.name,
        displayName: sku?.name,
        values: parseSkuValues(sku?.values),
      };
    });
  
    return variations;
  };
  
  const normalizeVariant = (items: Item[]) => {
    const itemResult = items.map(item => {
      return {
        id: item?.itemId,
        options: parseProductOption(item),
        availableForSale:
          item?.sellers[0]?.commertialOffer?.AvailableQuantity > 0 ? true : false,
      };
    });
  
    return itemResult;
  };
  
  const listValuesSku = (values: any[]) => {
    const valueList = values?.map((val: any) => {
      return {label: val?.name};
    });
  
    return valueList;
  };
  
  const normalizeSKU = (skus: any) => {
    const skuList = skus?.map((sku: any) => {
      return {
        id: sku?.field?.name,
        displayName: sku?.field?.name,
        values: listValuesSku(sku?.values),
      };
    });
  
    return skuList;
  };
  
  const money = ({
    ListPrice,
    PriceWithoutDiscount,
    currencyCode,
    ...rest
  }: CommertialOffer & {currencyCode: CurrencyCode}) => {
    return {
      listPrice: ListPrice,
      value: +PriceWithoutDiscount,
      currencyCode: currencyCode,
      discountPercentage: getDiscount({...rest, ListPrice, PriceWithoutDiscount}),
    };
  };
  
  const normalizeProductImages = (images: Item['images']) =>
    images?.map(({imageUrl: url, ...rest}) => ({
      url,
      ...rest,
    }));
  
  const normalizeProduct = (product: Product) => {
    return {
      id: product?.productId,
      brand: product?.brand,
      name: product?.productName,
      vendor: product?.items[0]?.sellers[0]?.sellerName,
      path: product?.link,
      slug: product?.linkText,
      price: money({
        ...product?.items[0]?.sellers[0]?.commertialOffer,
        currencyCode: CurrencyCode?.Cop,
      }),
      images: normalizeProductImages(product?.items[0]?.images),
      description: product.description,
      availableQuantity:
        product?.items[0]?.sellers[0]?.commertialOffer?.AvailableQuantity || 0,
      variants: normalizeVariant(product?.variations),
    };
  };
  
  const NormalizeProduct = (product: VtexProduct) => {
    //  console.log("PRODUCT MAP >>>>",JSON.stringify(product))
    return [
      {
        id: product?.productId,
        brand: product?.brand,
        name: product?.productName,
        vendor: product?.items[0]?.sellers[0]?.sellerName,
        path: product?.link,
        slug: product?.linkText,
        price: money({
          ...product?.items[0]?.sellers[0]?.commertialOffer,
          currencyCode: CurrencyCode?.Cop,
        }),
        images: normalizeProductImages(product?.items[0]?.images),
        description: product.description,
        availableQuantity:
          product?.items[0]?.sellers[0]?.commertialOffer?.AvailableQuantity || 0,
        skuSpecifications: normalizeSKU(product?.skuSpecifications),
        variants: normalizeVariant(product?.items),
      },
    ];
  };
  export default NormalizeProduct;