import { ImageProps } from '@my-app/ui';
import { ProductTypes } from '@vercel/commerce/types/product';
import { Product } from '../../../utils/product';

type ICard = {
    image: ImageProps
    product:Product
    noNameTag?: boolean,
    maxCharts?:number,
    style?:string,
    textAddtoCart?:string
}

export type {
    ICard
}
