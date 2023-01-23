export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO-8601 encoded UTC date time string. Example value: `"2019-07-03T20:47:55Z"`. */
  DateTime: any;
  /** A signed decimal number, which supports arbitrary precision and is serialized as a string. Example value: `"29.99"`. */
  Decimal: any;
  /** A string containing HTML code. Example value: `"<p>Grey cotton knit sweater.</p>"`. */
  HTML: any;
  /** A monetary value string. Example value: `"100.57"`. */
  Money: any;
  /**
   * An RFC 3986 and RFC 3987 compliant URI string.
   *
   * Example value: `"https://johns-apparel.myshopify.com"`.
   *
   */
  URL: any;
};

interface SearchArgs {
  query: string | null;
  category: string | null;
  specificationFilters: string[] | null;
  priceRange: string | null;
  collection: string | null;
  salesChannel: string | null;
  orderBy: string | null;
  from: number | null;
  to: number | null;
  map: string | null;
  hideUnavailableItems: boolean | null;
}

interface Metadata {
  metaTagDescription?: string;
  titleTag?: string;
}

interface Brand {
  id: string;
  name: string;
  isActive: boolean;
  title?: string;
  metaTagDescription?: string;
}

interface Category {
  id: number;
  name: string;
  url: string;
  hasChildren: boolean;
  children: Category[];
  MetaTagDescription: string;
  Title: string;
}

interface FacetsArgs {
  facets: string; // deprecated!
  query: string;
  map: string;
  hideUnavailableItems: boolean;
}

export interface VtexProduct {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  linkText: string;
  productReference: string;
  categoryId: string;
  productTitle: string;
  metaTagDescription: string;
  clusterHighlights: Record<string, string>;
  productClusters: Record<string, string>;
  searchableClusters: Record<string, string>;
  categories: string[];
  categoriesIds: string[];
  link: string;
  description: string;
  items: Item[];
  itemMetadata: {
    items: CatalogMetadataItem[];
  };
  titleTag: string;
  jsonSpecifications: string;
}

export interface Item {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  referenceId: Array<{Key: string; Value: string}>;
  measurementUnit: string;
  unitMultiplier: number;
  modalType: any | null;
  images: Array<{
    imageId: string;
    imageLabel: string | null;
    imageTag: string;
    imageUrl: string;
    imageText: string;
  }>;
  videos: Array<{
    videoUrl: string;
  }>;
  variations: string[];
  sellers: Seller[];
}

interface Installment {
  Value: number;
  InterestRate: number;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  PaymentSystemName: string;
  PaymentSystemGroupName: string;
  Name: string;
}

// TODO: It should be Commercial, but there are so many places with this typo that I prefer to keep
export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: Record<
    string,
    {DeliverySlaPerTypes: any[]; Region: any | null}
  >;
  Installments: Installment[];
  DiscountHighLight: any[];
  GiftSkuIds: string[];
  Teasers: any[];
  BuyTogether: any[];
  ItemMetadataAttachment: any[];
  Price: number;
  PriceWithPriceTags: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  RewardValue: number;
  PriceValidUntil: string;
  AvailableQuantity: number;
  Tax: number;
  DeliverySlaSamples: Array<{
    DeliverySlaPerTypes: any[];
    Region: any | null;
  }>;
  GetInfoErrorMessage: any | null;
  CacheVersionUsedToCallCheckout: string;
}

interface Seller {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
}

interface SalesChannelAvailable {
  Id: number;
  Name: string;
  IsActive: boolean;
  ProductClusterId: string | null;
  CountryCode: string;
  CultureInfo: string;
  TimeZone: string;
  CurrencyCode: string;
  CurrencySymbol: string;
  CurrencyLocale: number;
  CurrencyFormatInfo: unknown;
  Position: number;
  ConditionRule: string | null;
  CurrencyDecimalDigits: null | number;
}

interface CompositionItem {
  id: string;
  minQuantity: number;
  maxQuantity: number;
  initialQuantity: number;
  priceTable: string;
  seller: string;
}

interface Composition {
  minQuantity: number;
  maxQuantity: number;
  items: CompositionItem[];
}

interface AssemblyOption {
  id: string;
  name: string;
  composition: Composition | null;
}

interface CatalogMetadataItem {
  Name: string;
  NameComplete: string;
  MainImage: string;
  BrandName: string;
  CategoryId: number;
  ProductId: number;
  id: string;
  seller: string;
  assemblyOptions: AssemblyOption[];
}

export interface SearchResponse {
  products: VtexProduct[];
  recordsFiltered: number;
}

export enum CurrencyCode {
  /** United States Dollars (USD). */
  Usd = 'USD',
  /** Euro (EUR). */
  Eur = 'EUR',
  /** Colombia (COP). */
  Cop = 'COP',
}
export type Money = {
  /** Decimal money amount. */
  amount: Scalars['Decimal'];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};



export type RNFProductPrice = {
  value: number
  currencyCode?: 'USD' | 'EUR' | 'ARS' | 'GBP' | string
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
}