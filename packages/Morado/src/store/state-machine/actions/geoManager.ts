type Context = {
  idCart: string;
  selectedView: string;
  selectedAddress?: string;
  addAddressForm: {
    department: string;
    city: string;
  };
  map: {
    currentCoordinates: Coordinates;
  };
};

type Coordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type NewAddressEvent = {
  name: 'department' | 'city';
  value: string;
};

interface NewAddress {
  event: NewAddressEvent;
}

type Cart = {
  idCart: string;
};

const defaultContext = {
  idCart: null,
  selectedAddress: null,
  isEmpty: null,
  selectedView: 'empty-address',
  map: {
    currentCoordinates: {
      latitude: 3.6163965,
      longitude: -73.0476117,
      latitudeDelta: 15,
      longitudeDelta: 15,
    },
  },
  addAddressForm: {
    department: '',
    city: '',
    postalCode: '',
  },
};

export default {
  'fetch-cloud': (context: Context, _: Event) => {},
  'fetch-local': (context: Context, _: Event) => {},
  'select-delivery-view': (context: Context, _: Event) => {
    context.selectedView = 'add-delivery-address';
  },
  'select-add-new-address-view': (context: Context, _: Event) => {
    context.selectedView = 'add-new-address';
  },
  'select-empty-address-view': (context: Context, _: Event) => {
    context.selectedView = 'empty-address';
  },
  'new-address-handler': (context: Context, event: NewAddress['event']) => {
    context['addAddressForm'][event.name] = event.value;
  },
  'confirm-new-address': (context: Context, event: NewAddress['event']) => {
    context.selectedView = 'empty-address';
    // ??
  },
  'set-cart-id': (context: Context, event: Cart) => {
    context.idCart = '__ofid=' + event.idCart;
  },
  'select-place': (context: Context, event: Coordinates) => {
    if (event) {
      context.map.currentCoordinates = event;
    }
  },
  'reset': (context: Context, _: any) => {
    const keys = Object.keys(defaultContext)
    for(let i = 0; i<keys.length; i++){
      context[keys[i]] = defaultContext[keys[i]]
    }
  }
};
