import {SubmitButton} from './Form/FormSubmit';
import {Form} from './Form/Form';
import {View} from 'react-native';
import AppStorage from '@my-app/app/src/framework/styleguide/utils/async-storage';
import * as Icons from './icons';
import ProductView from './Product/ProductView';
import {StoreLink} from '../StoreLink';
import ProductList from './Product/ProductList';
import ProductDetail from './Product/ProductDetail';
import CartList from './Cart/CartList';

import {
  getSearchVariables,
  normalizeProduct,
} from '@vercel/commerce-shopify/utils';
import {IfConditionalHandler} from '@my-app/app/src/framework/styleguide/utils/conditionals';
import SocialButton from './OAuth/SocialButtons';
import NormalizeProduct from './utils/normalizeSearch';
import NormalizeProductDetail from './utils/normalizeProduct';
import RichText from './RichText';
import {FormSelect} from './Form/FormSelect';
import Divider from './Divider';
import PasswordRules from './common/PasswordRules';
import ResendOtpCode from './common/ResendOtpCode';
import FormInput from './Form/FormInput';
import ImageComponent from './Image/Image';
import WalkthroughView from './Walkthrough/WalkthoughView';
import CookieManager from '@my-app/app/src/framework/styleguide/utils/cookies';
import {
  makeid,
  randomPassword,
} from '@my-app/app/src/framework/engine/utils/randomKey';
import GridComponent from './common/Container';
import {StoreIcons} from './StoreIcon';
import CarouselComponent from './common/Carousel';
import MiniInfoBanner from './common/MiniInfoBanner';
import SearchInputComponent from './common/SeachInput';
import TabsController from './Tabs';
import TabPage from './Tabs/TabPage';
import {SearchQuery} from './utils/vtexSearchQueryUtils';
import Logout from './Auth/Logout';
import CartBadge from './Cart/CartBadge';
import WishlistList from './Wishlist/WishlistList';
import WishlistCounter from './Wishlist/WishlistCounter';
import ItemsList from './ItemsList';
import PokemonList from './List/index';

const styleguide = {
  ui: {
    'store-form': Form, // ✅
    'store-form.input': FormInput, // ✅
    'store-form.select': FormSelect,
    'store-form.submit': SubmitButton, // ✅
    'product-list': ProductList,
    'product-detail': ProductDetail,
    'cart-list': CartList,
    link: StoreLink, // ✅
    'social-button': SocialButton,
    'rich-text': RichText, // ✅
    divider: Divider, // ✅
    'password-rules': PasswordRules, // ✅
    'resend-otp-code': ResendOtpCode, // ✅
    image: ImageComponent, // ✅
    'walkthrough-view': WalkthroughView, // ✅
    grid: GridComponent,
    'store-icons': StoreIcons,
    carousel: CarouselComponent,
    'mini-info-banner': MiniInfoBanner,
    'tabs-controller': TabsController,
    'tabs-page': TabPage,
    'search-input': SearchInputComponent,
    logout: Logout,
    'cart-badge': CartBadge,
    'wishlist-list': WishlistList,
    'wishlist-counter': WishlistCounter,
    'items-list': ItemsList,
    'pokemon-list': PokemonList,
    default: View,
  },
  icons: Icons,
  utils: {
    AsyncStorage: AppStorage,
    CookieManager: CookieManager,
    ProductSearch: {
      GetVariables: getSearchVariables,
      NormalizeProduct,
      SearchQuery,
      NormalizeProductDetail,
    },
    Conditions: {
      If: IfConditionalHandler,
    },
    Commons: {
      RandomPassword: randomPassword,
      MakeId: makeid,
    },
  },
};

export default styleguide;
