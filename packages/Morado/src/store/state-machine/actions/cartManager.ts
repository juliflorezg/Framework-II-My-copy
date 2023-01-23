import {Product} from '../../../utils/product';

type Context = {
  count: number;
  products: CartProduct[];
  comments?: {
    [x: string]: any;
  };
  notificationCart: boolean;
};

interface CartProduct extends Product {
  quantity: number;
  variantId: string;
}

type Event = {
  product?: Product;
  comments?: {
    [x: string]: any;
  };
  variantId: string;
  notificationCart: boolean;
};

const cartDefaultValue = {
  "count": 0,
  "cartId": null,
  "products": [],
  "saved": false,
  "comments": "",
  "notificationCart": false
}

export default {
  increment: (context: Context, event: Event) => {
    const cpyArr = [...context.products];
    if (event?.product) {
      const toIndex = cpyArr.findIndex(pred => {
        return pred.id === event?.product?.id;
      });

      if (toIndex != -1) {
        context.products[toIndex].quantity =
          context.products[toIndex].quantity + 1;
      }
    }

    context.products = cpyArr;
  },
  decrement: (context: Context, event: Event) => {
    const cpyArr = [...context.products];
    if (event?.product) {
      const toIndex = cpyArr.findIndex(pred => {
        return pred.id === event?.product?.id;
      });
      if (toIndex != -1) {
        if (context.products[toIndex].quantity !== 0) {
          context.products[toIndex].quantity =
            context.products[toIndex].quantity - 1;
        }
      }
    }
    context.products = cpyArr;
  },
  'add-product': (context: Context, event: Event) => {
    context.count = context.count + 1;
    context.notificationCart = true;
    const cpyArr = [...context.products];
    if (event?.product) {
      cpyArr.push({
        ...event?.product,
        quantity: 1,
        variantId: event?.variantId,
      });
    }
    context.products = cpyArr;
  },
  'remove-product': (context: Context, event: Event) => {
    context.count = context.count - 1;
    const cpyArr = [...context.products];
    if (event?.product) {
      const toRemoveIndex = cpyArr.findIndex(pred => {
        return pred.id === event?.product?.id;
      });
      if (toRemoveIndex != -1) {
        cpyArr.splice(toRemoveIndex, 1);
      }
    }
    context.products = cpyArr;
  },
  "remove-cart": (context: Context, event: Event) => {
    const keys = Object.keys(cartDefaultValue)
    for(let i = 0; i<keys.length; i++){
      context[keys[i]] = cartDefaultValue[keys[i]]
    }
  },
  'edit-variant': (context: Context, event: Event) => {
    const cpyArr = [...context.products];

    if (event?.product) {
      const toIndex = cpyArr.findIndex(pred => {
        return pred.id === event?.product?.id;
      });
      if (toIndex != -1) {
        context.products[toIndex].variantId = event?.variantId;
      }
    }
    context.products = cpyArr;
  },
  'add-comments': (context: Context, event: Event) => {
    if (event?.comments?.name) {
      context.comments = event?.comments?.name;
    }
  },
  'notification-cart': (context: Context, event: Event) => {
    context.notificationCart = event.notificationCart;
  },
  'remove': {
    
  },
  'fetch-cloud': (context: Context, _: Event) => {},
  'fetch-local': (context: Context, _: Event) => {},
};

/**
 * Pudiesemos validar si corresponden los datos para no pushear cosas incorrectas, pero deberiamos tenerlo tipado
 * y como lo normalizamos se supone que sea lo correcto.
 */
