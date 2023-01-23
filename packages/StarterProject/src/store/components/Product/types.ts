import { ImageProps } from '@my-app/ui';
import { ProductTypes } from '@vercel/commerce/types/product';
import { Product } from '../../../utils/product';

interface QuantitySelectorProps {
    availableQuantityInfo?: boolean;
  }
type ICard = {
    image: ImageProps
    product:Product
    noNameTag?: boolean,
    maxCharts?:number,
    style?:string,
    textAddtoCart?:string,
    quantitySelector?:QuantitySelectorProps
}

export type {
    ICard
}
