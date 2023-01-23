import { CurrencyCode, Money, Product, Item, SearchResponse, CommertialOffer, VtexProduct } from "../../../utils/vtexProduct"


const getDiscount = (commertialOffer: CommertialOffer) => {
    const baseAmount = Number(
        commertialOffer.ListPrice
    );
    const amount = Number(commertialOffer.PriceWithoutDiscount);
    const hasDiscount = baseAmount > amount;
    if (hasDiscount) {
        return Math.round(((baseAmount - amount) / baseAmount) * 100);
    } else {
        return '0';
    }
};


const money = ({ ListPrice, PriceWithoutDiscount, currencyCode, ...rest }: CommertialOffer & { currencyCode: CurrencyCode }) => {
    return {
        listPrice: ListPrice,
        value: +PriceWithoutDiscount,
        currencyCode: currencyCode,
        discountPercentage: getDiscount({...rest, ListPrice, PriceWithoutDiscount})
    }
}

const normalizeProductImages = (images: Item['images']) =>
    images?.map(({ imageUrl: url, ...rest }) => ({
        url,
        ...rest,
    }))

const normalizeProduct = (product: Product) => {

    console.log("product VTEX 2 >>>> ",{
        id: product?.productId,
        brand: product?.brand,
        name: product?.productName,
        vendor: product?.items[0]?.sellers[0]?.sellerName,
        path: product?.link,
        slug: product?.link,
        price: money({ ...product?.items[0]?.sellers[0]?.commertialOffer, currencyCode: CurrencyCode?.Cop }),
        images: normalizeProductImages(product?.items[0]?.images),
    })

    return {
        id: product?.productId,
        brand: product?.brand,
        name: product?.productName,
        vendor: product?.items[0]?.sellers[0]?.sellerName,
        path: product?.link,
        slug: product?.linkText,
        price: money({ ...product?.items[0]?.sellers[0]?.commertialOffer, currencyCode: CurrencyCode?.Cop }),
        images: [],
    }
}

const NormalizeProduct = (product: VtexProduct) => {
 
    return  [{
        id: product?.productId,
        brand: product?.brand,
        name: product?.productName,
        vendor: product?.items[0]?.sellers[0]?.sellerName,
        path: product?.link,
        slug: product?.linkText,
        price: money({ ...product?.items[0]?.sellers[0]?.commertialOffer, currencyCode: CurrencyCode?.Cop }),
        images: normalizeProductImages(product?.items[0]?.images),
      
    }]
}
export default NormalizeProduct