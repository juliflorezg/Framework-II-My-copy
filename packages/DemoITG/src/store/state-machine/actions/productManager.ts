import {Product} from '../../../utils/product';

type Context = {
  products?: IProduct[];
  selectedProduct?: Product;
 
};

interface IProduct extends Product {
  selectedSku: SelectedSku;
}

type Event = {
  product?: Product;
  selectedSku: SelectedSku;
};

type SelectedSku = {
  id: string;
  value: [Sku];
};

type Sku = {
  displayName: string;
  value: string;
};

 
export default {
  'selected-product': (context: Context, event: Event) => {
    if (event?.product) {
      context.selectedProduct = event?.product;
    }
  },
  

  'add-variant': (context: Context, event: Event) => {
    const cpyArr = [...context.products];

    if (event?.product) {
      const toIndex = cpyArr.findIndex(pred => {
        return pred.id === event?.product?.id;
      });
      if (toIndex != -1) {
        context.products[toIndex].selectedSku = event?.selectedSku;
      } else {
        cpyArr.push({...event?.product, selectedSku: event?.selectedSku});
      }
    }
    context.products = cpyArr;
  },
  'remove-product': (context: Context, event: Event) => {
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

  'fetch-cloud': (context: Context, _: Event) => {},
  'fetch-local': (context: Context, _: Event) => {},
};
