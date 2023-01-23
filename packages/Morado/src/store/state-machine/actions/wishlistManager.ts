import { Product } from "../../../utils/product";

type Context = {
  count: number
  products: Product[]
} 

 
type Event = {
  product?: Product
}

export default {
  "add-product": (context: Context, event: Event) => {
    context.count = context.count + 1;
    const cpyArr = [...context.products]
    if(event?.product){
      cpyArr.push({...event?.product})
    }
    context.products = cpyArr
  },
  "remove-product": (context: Context, event: Event) => {
    context.count = context.count - 1;
    const cpyArr = [...context.products]
    if(event?.product){
      const toRemoveIndex = cpyArr.findIndex((pred)=>{
        return pred.id === event?.product?.id
      })
      if(toRemoveIndex != -1){
        cpyArr.splice(toRemoveIndex,1)
      }
    }
    context.products = cpyArr
  },
  "fetch-cloud": (context: Context, _: Event) => {
    
  },
  "fetch-local": (context: Context, _: Event) => {
    
  },
};

/**
 * Pudiesemos validar si corresponden los datos para no pushear cosas incorrectas, pero deberiamos tenerlo tipado
 * y como lo normalizamos se supone que sea lo correcto.
 */