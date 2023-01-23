import { CurrencyCode, Money, Product, Item, SearchResponse, CommertialOffer } from "../../../utils/vtexProduct"


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


const parseSlug =(slug:string) =>{
    
    if (slug.includes("https://portal.vtexcommercestable.com.br")) {
       
    return  slug = slug.replace("https://portal.vtexcommercestable.com.br","")
    } 

    return slug 
    
}

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
    return {
        id: product.productId,
        brand: product.brand,
        name: product.productName,
        vendor: product.items[0].sellers[0].sellerName,
        path: product.link,
        slug: parseSlug(product.link),
        price: money({ ...product.items[0].sellers[0].commertialOffer, currencyCode: CurrencyCode.Cop }),
        images: normalizeProductImages(product.items[0].images),
    }
}

const NormalizeProduct = (products: SearchResponse['products']) => {
    return products.map((product) => normalizeProduct(product))
}
export default NormalizeProduct