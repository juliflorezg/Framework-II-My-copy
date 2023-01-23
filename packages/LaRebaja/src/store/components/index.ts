import { SubmitButton } from "./Form/FormSubmit";
import { Form } from "./Form/Form";
import { View } from "react-native";
import AppStorage from "@my-app/app/src/framework/styleguide/utils/async-storage";
import * as Icons from './icons'
import { StoreLink } from "./StoreLink";

import { getSearchVariables } from "@vercel/commerce-shopify/utils";
import { IfConditionalHandler } from "@my-app/app/src/framework/styleguide/utils/conditionals";
import SocialButton from './OAuth/SocialButtons'
import NormalizeProduct from "./utils/normalizeSearch";
import RichText from "./RichText";
import { FormSelect } from "./Form/FormSelect";
import Divider from "./Divider";
import PasswordRules from "./common/PasswordRules";
import ResendOtpCode from "./common/ResendOtpCode";
import FormInput from "./Form/FormInput";
import ImageComponent from "./Image/Image";
import WalkthroughView from "./Walkthrough/WalkthoughView";
import CookieManager from "@my-app/app/src/framework/styleguide/utils/cookies";
import { makeid, randomPassword } from "@my-app/app/src/framework/engine/utils/randomKey";
import GridComponent from "./common/Container";
import GetRedirectLocationFromHeaders from "./utils/GetRedirectLocationFromHeaders";
import getURLParams from "./utils/getUrlParams";
import Slider from "./Slider";
import { StoreIcons } from "./StoreIcon";
import StepperComponent from "./Stepper";
import { StepperSubmitButton } from "./Stepper/components/StepperSubmit";
import CarouselComponent from './common/Carousel';
import SearchInputComponent from './common/SeachInput';
import CartBadge from './Cart/CartBadge';
import Showcase from "./Showcase";
import ProductList from "./Product/ProductList";
import {
  SearchQuery,
} from './utils/vtexSearchQueryUtils';
import NormalizeProductDetail from './utils/normalizeProduct';
import ProductDetail from "./Product/ProductDetail";
import Logout from "./Auth/Logout";

const styleguide = {
  ui: {
    'store-form': Form, // ✅
    'store-form.input': FormInput, // ✅
    'store-form.select': FormSelect,
    'store-form.submit': SubmitButton, // ✅
    'link': StoreLink, // ✅
    'social-button': SocialButton,
    'rich-text': RichText, // ✅
    'divider': Divider, // ✅
    'password-rules': PasswordRules, // ✅
    'resend-otp-code': ResendOtpCode, // ✅
    'image': ImageComponent, // ✅
    'walkthrough-view': WalkthroughView, // ✅
    'grid': GridComponent,
    'store-icons': StoreIcons,
    'default': View,
    "slider":Slider,
    'stepper': StepperComponent,
    'stepper.submit': StepperSubmitButton,
    carousel: CarouselComponent,
    'search-input': SearchInputComponent,
    'cart-badge': CartBadge,
    'product-list': ProductList,
    'product-detail': ProductDetail,
    'showcase':Showcase,
    'logout': Logout
  },
  icons: Icons,
  utils: {
    AsyncStorage: AppStorage,
    CookieManager: CookieManager,
    ProductSearch: {
      GetVariables: getSearchVariables,
      NormalizeProduct,
      SearchQuery,
      NormalizeProductDetail 
    },
    Conditions: {
      If: IfConditionalHandler
    },
    Commons: {
      RandomPassword: randomPassword,
      MakeId: makeid,
      GetRedirectLocationFromHeaders,
      GetURLParams: getURLParams,
    }
  }
};

export default styleguide;
