import { useCallback } from 'react';
import useOmniHook, { UseOmniHook } from '../../kernel/hook/use-omni-hook';
import { HookFetcherOptions, MutationHook } from '../../kernel/utils/types';
import set from 'lodash.set'
import { customerAccessTokenCreateMutation, getAllProductsQuery, getCollectionProductsQuery, getCustomerQuery } from '@vercel/commerce-shopify/utils';
import { addVarToString } from '../utils/addVarToString';
import isArray from 'lodash.isarray';
import get from 'lodash.get';
import { useCommons } from '../../kernel/utils/use-hook';
import { makeid } from '../../../engine/utils/randomKey';

export default useOmniHook as UseOmniHook<typeof handler>;

const VarDefinitions = {
  array: [],
  varchar: "",
  object: {},
  bool: false,
  float: 0.0,
  int: 0,
};

type obj = { [x: string]: any }

interface ParseResponse<TO = unknown, FROM = unknown> {
  from: FROM;
  to: TO;
}
type Action = any

type ExecParams = {
  [x: string]: unknown
  template: {
    [x: string]: any
  }
  variables: {
    [x: string]: any
  }
  input: {
    exec: Action[]
  },
  options: HookFetcherOptions
}




const parseQueryInput = (response: any, output: { [x: string]: any }, to: { [x: string]: any },) => {
  if (typeof response === 'object') {
    const keys = Object.keys(response);
    keys?.forEach((key) => {
      if (response?.hasOwnProperty(key)) {
        if (typeof response[key] == 'object') {
          parseQueryInput(response[key], output, to);
        } else {
          output[key] = addVarToString(response[key], to)
        }
      }
    });
  } else {
    Object.assign(output, addVarToString(response, to))
  }
};
const findPath = (ob: any, key: string) => {
  const path: string[] = [];
  const keyExists = (obj: { [x: string]: any }): boolean => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
      return false;
    }
    else if (obj?.hasOwnProperty(key)) {
      return true;
    }
    else if (Array.isArray(obj)) {
      let parentKey = path.length ? path.pop() : "";

      for (let i = 0; i < obj.length; i++) {
        path.push(`${parentKey}[${i}]`);
        const result = keyExists(obj[i]);
        if (result) {
          return result;
        }
        path.pop();
      }
    }
    else {
      for (const k in obj) {
        path.push(k);
        const result = keyExists(obj[k]);
        if (result) {
          return result;
        }
        path.pop();
      }
    }
    return false;
  };

  keyExists(ob);

  return path.join(".");
}
export const objectKeyhasher = (object: obj) => {
  const recursive = (object: obj) => {
    for (const [key, value] of Object.entries(object)) {
      const id = makeid(4)
      const keyObj = key + "#" + id
      object[keyObj] = value
      delete object[key]

      if (!isArray(value) && typeof value === 'object') recursive(object[keyObj])
    }
  }
  recursive(object)
}

export const objectKeyHashRemover = (object: obj) => {
  const recursive = (object: obj) => {
    for (const [key, value] of Object.entries(object)) {

      const keyObj = key?.replace(/#.*$/, "");
      object[keyObj] = value
      delete object[key]

      if (!isArray(value) && typeof value === 'object') recursive(object[keyObj])
    }
  }
  recursive(object)
}


type ExecType = {
  exec: (action: Action, config?: { disableParser: boolean }) => Promise<void>
  syncExec: (action: Action, config?: { disableParser: boolean }) => void
}

export const parseResponse = (
  responses: any,
  parseInput: ParseResponse,
  execFunctions: ExecType,
  sync?: boolean
) => {
  if(isArray(responses)) return responses
  let parsed = {}
  const parseFromTo = async (response: any, output: { [x: string]: any }, parseResponse: any) => {
    if (!response) return;
    for (let key in response) {
      try {
        if (key in response) {
          let responseValue = response[key]

       
          if (typeof responseValue === 'boolean' || typeof responseValue === 'number') {
            const toPath = findPath(parseInput?.to, key)
            const val = responseValue
            if (!toPath.length) output[key] = val
            else {
              set(output, toPath + "." + key, val)
            }
          } else if (isArray(responseValue) || typeof responseValue !== 'object') {
        
            if (responseValue?.includes("{") && responseValue?.includes("}")) {
              responseValue = responseValue?.replace(/[{}]/g, '')
            }
       
            const toPath = findPath(parseInput?.to, key)
            const val = get(parseResponse, responseValue) || responseValue
            if (!toPath.length) output[key] = val
            else {
              set(output, toPath + "." + key, val)
            }

          } else if (typeof responseValue == 'object') {
            objectKeyHashRemover(responseValue)
            if (responseValue?.pathValue && responseValue?.parseFunction) {
              const val = get(parseResponse, responseValue?.pathValue)
              let parsed = null

              if (!responseValue?.sync) {
                parsed = await execFunctions.exec({
                  name: responseValue?.parseFunction,
                  function: responseValue?.function,
                  params: [val]
                }, {
                  disableParser: true
                })
              } else {
                parsed = execFunctions.syncExec({
                  name: responseValue?.parseFunction,
                  function: responseValue?.function,
                  params: [val]
                }, {
                  disableParser: true
                })
              }

              const toPath = findPath(parseInput?.to, key)
              if (!toPath.length) output[key] = parsed
              else {
                set(output, toPath + "." + key, parsed)
              }

            } else {
              objectKeyhasher(responseValue)
              parseFromTo(responseValue, output, parseResponse);
            }

          }
        }
      } catch (e) {
        console.log("Error in Hook Action", e)
      }
    }
  }



  objectKeyhasher(parseInput?.to as any)
  parseFromTo(parseInput?.to, parsed, responses)
  objectKeyHashRemover(parsed)
  return parsed
};




const ExecHandler = async ({ input, options, variables, template, utils, ...AllExecResponses }: ExecParams, MainAction: Record<string, any>) => {

  let SharedData = {
    ...AllExecResponses
  }

  const ParseParams = (action: Action) => {
    let parsedParams = action?.params || []
    return parsedParams.map((param: string) => {
      let to = {
        ...input
      }
      if (SharedData?.hasOwnProperty(action.dependsOn)) {
        if (!isArray(SharedData[action.dependsOn]) && typeof SharedData[action.dependsOn] !== 'object') {
          to = {
            ...to,
            [action.dependsOn]: SharedData[action.dependsOn]
          }
        } else {
          to = {
            ...to,
            ...SharedData[action.dependsOn]
          }
        }

      }
      if (typeof param == 'object') {
        return parseResponse(to, { to: param }, { syncExec, exec }, action?.sync);
      }
      return addVarToString(param, to)
    })
  }

  const syncExec = (action: Action, config?: { disableParser: boolean }) => {
    let actionParams = []
    if (config?.disableParser) {
      actionParams = action?.params
    } else {
      actionParams = ParseParams(action)
    }
    const execRes = utils[action.name][action.function](...actionParams)
    SharedData = {
      ...SharedData,
      [action.name]: execRes
    }
    return execRes
  }

  const exec = async (action: Action, config?: { disableParser: boolean }) => {
    let actionParams = []
    if (config?.disableParser) {
      actionParams = action?.params
    } else {
      actionParams = ParseParams(action)
    }
    const execRes = await utils[action.name][action.function](...actionParams)
    SharedData = {
      ...SharedData,
      [action.name]: execRes
    }
    return execRes
  };
  const onSuccess = async (successActions: Action[]) => {
    for (let i = 0; i < successActions?.length; i++) {
      await exec(successActions[i])
    }
  }
  const onError = async (errorActions: Action[]) => {
    for (let i = 0; i < errorActions?.length; i++) {
      await exec(errorActions[i])
    }
  }

  for (let i = 0; i < template.exec.length; i++) {
    const action = template.exec[i]


    try {
      if (!MainAction[action.name]) {
        if (action?.sync) {
          const syncRes = syncExec(action)
          SharedData = {
            ...SharedData,
            [action.name]: syncRes
          }
        } else {
          const asyncRes = await exec(action)
          SharedData = {
            ...SharedData,
            [action.name]: asyncRes
          }

        }

      } else {
        // let output = {}


        // action?.params?.forEach((param) => parseQueryInput(param, output, SharedData))


        const actionParams = action?.params?.map((param: string) => {

          let to = {
            ...input
          }
          if (SharedData?.hasOwnProperty(action.dependsOn)) {
            to = {
              ...to,
              ...SharedData[action.dependsOn]
            }
          }
          if (typeof param == 'object') {
            return parseResponse(to, { to: param }, { syncExec, exec }, action?.sync);
          }
          return addVarToString(param, to)
        })

        const parsed = actionParams?.reduce(function (result, item) {
          if (typeof item == 'object') {
            result = {
              ...result,
              ...item,
            }
            return result
          }
          var key = Object.keys(item)[0]; //first property: a, b, c
          result[key] = item[key];
          return result;
        }, {}) || {}


        const response = await MainAction[action.name]({
          ...options,
          variables: {
            ...input,
            ...parsed
          },
          headerOptions: template?.headerOptions,
          withCookies: template?.withCookies,
          ignoreCookies: template?.ignoreCookies,
          env: variables
        })

        if (template?.parseResponse) {
          const parsedResponses = parseResponse(response, template?.parseResponse, { syncExec, exec });
          SharedData = {
            ...SharedData,
            [template.name]: parsedResponses
          }
        } else {

          SharedData = {
            ...SharedData,
            [template.name]: response
          }
        }



      }
      await onSuccess(action.onSuccess)
    } catch (e) {
      console.log("Error in Execution Hook", e, action)
      await onError(action.onError)
      return SharedData
    }
  }
  if (SharedData?.params) delete SharedData?.params
  return SharedData
}

const queries = {
  getCategories:`
  query{
    categories @context(provider:"vtex.store-graphql") {
      id
      name
      slug
      hasChildren
      children{
        id
        name
        slug
      }
    }
  } 
  `,
  customerAccessTokenCreateMutation,
  getCustomerQuery: `query {
    profile @context(provider: "vtex.store-graphql")  {
      firstName
      lastName
      email
    }
  }`,
  getAllProductsQuery,
  createOrganization: `mutation createOrganization($input: OrganizationInput!) {
      createOrganization(input: $input)@context(provider: "vtex.b2b-organizations-graphql")
         {
          id
          costCenterId
          href
          status
      }
    }`,
  addOrganizationUser: `mutation addUser($orgId: ID,$costId:ID, $roleId:ID!, $name:String!, $email:String!, ) {
      addUser(orgId: $orgId, costId:$costId,roleId: $roleId, name: $name, email:$email)@context(provider: "vtex.b2b-organizations-graphql")
         {
           id
          status
          message
         }
    }`,
  redefinePassword: `mutation redefinePassword(
      $email: String!
      $currentPassword: String!
      $newPassword: String!
      $vtexIdVersion: String){
        redefinePassword(email:$email, currentPassword:$currentPassword, newPassword:$newPassword, vtexIdVersion:$vtexIdVersion)
      }`,
  oAuth: `mutation oAuth(
        $provider: String!,
        $redirectUrl: String!
      ){
        oAuth(provider: $provider, redirectUrl: $redirectUrl)
      }`,
  topSearches: `query topSearches {
    topSearches @context(provider: "vtex.search-graphql") {
      searches {
        term
      }
    }
  }`,
  productSearch: `fragment ProductFragment on Product {
    productId
    description
    productName
    productReference
    brand
    brandId
    link
    categories
    categoryId
    clusterHighlights{
            id
            name
    }
    productClusters {
            id
            name
    }
    priceRange {
      sellingPrice {
        highPrice
        lowPrice
      }
      listPrice {
        highPrice
        lowPrice
      }
    }
    specificationGroups { 
      name
      originalName
      specifications {
          name
          originalName
          values
        }
    }
    skuSpecifications {
      field {
        name
        originalName
      }
      values {
        name
        originalName
      }
    }
  }

  fragment ItemFragment on SKU {
    itemId
    name
    variations {
      name
      values
    }
    referenceId {
      Key
      Value
    }
    measurementUnit
    unitMultiplier
    images {
      imageId
      imageUrl
      imageText
    }
    sellers {
      commertialOffer {
        teasers {
          name
          conditions {
            minimumQuantity
            parameters {
              name
              value
            }
          }
          effects {
            parameters {
              name
              value
            }
          }
        }
      }
    }
  }

  fragment SellerFragment on Seller {
    sellerId
    sellerName
    sellerDefault
  }

  fragment CommertialOfferFragment on Offer {
    discountHighlights {
      name
    }
    teasers {
      name
      conditions {
        minimumQuantity
        parameters {
          name
          value
        }
      }
      effects {
        parameters {
          name
          value
        }
      }
    }
    Price
    ListPrice
    Tax
    taxPercentage
    spotPrice
    PriceWithoutDiscount
    RewardValue
    PriceValidUntil
    AvailableQuantity
  }

  fragment InstallmentFragment on Installment {
    Value
    InterestRate
    TotalValuePlusInterestRate
    NumberOfInstallments
    Name
    PaymentSystemName
  }

  query productSearchV3(
    $queryFacets: String
    $query: String
    $map: String
    $fullText: String
    $selectedFacets: [SelectedFacetInput]
    $orderBy: String
    $from: Int
    $to: Int
    $hideUnavailableItems: Boolean = false
    $skusFilter: ItemsFilter = ALL_AVAILABLE
    $simulationBehavior: SimulationBehavior = default
    $installmentCriteria: InstallmentsCriteria = MAX_WITHOUT_INTEREST
    $productOriginVtex: Boolean = false
    $fuzzy: String
    $operator: Operator
    $searchState: String
    $excludedPaymentSystems: [String]
    $includedPaymentSystems: [String]
    $collection: String
    $priceRange:String
  ) {
    productSearch(
      map: $map
      query: $query
      fullText: $fullText
      selectedFacets: $selectedFacets
      orderBy: $orderBy
      from: $from
      to: $to
      hideUnavailableItems: $hideUnavailableItems
      simulationBehavior: $simulationBehavior
      productOriginVtex: $productOriginVtex
      fuzzy: $fuzzy
      operator: $operator
      searchState: $searchState
      collection: $collection
      priceRange: $priceRange
    ) @context(provider: "vtex.search-graphql") {
      products {
        ...ProductFragment
        items(filter: $skusFilter) {
          ...ItemFragment
          sellers {
            ...SellerFragment
            commertialOffer {
              ...CommertialOfferFragment
              Installments(
                criteria: $installmentCriteria
                excludedPaymentSystems: $excludedPaymentSystems
                includedPaymentSystems: $includedPaymentSystems
              ) {
                ...InstallmentFragment
              }
            }
          }
        }
        selectedProperties {
          key
          value
        }
      }
      recordsFiltered
    }
    facets(
      query: $queryFacets
      selectedFacets: $selectedFacets
      fullText: $fullText
    ) @context(provider: "vtex.search-graphql") {
      facets {
        name
        values {
          id
          quantity
          name
          key
          value
          selected
          range {
            from
            to
          }
          link
          linkEncoded
          href
        }
      }
    }
  }
`,
  productQuery: `fragment CommertialOfferFragment on Offer {
  discountHighlights {
    name
  }
  teasers {
    name
    conditions {
      minimumQuantity
      parameters {
        name
        value
      }
    }
    effects {
      parameters {
        name
        value
      }
    }
  }
  Price
  ListPrice
  Tax
  taxPercentage
  spotPrice
  PriceWithoutDiscount
  RewardValue
  PriceValidUntil
  AvailableQuantity
}
query product(
  $slug: String
  $identifier: ProductUniqueIdentifier
  $regionId: String
  $salesChannel: Int
) {
  product(
    slug: $slug
    identifier: $identifier
    regionId: $regionId
    salesChannel: $salesChannel
  ) @context(provider: "vtex.search-graphql") {
    cacheId
    productId
    description
    productName
    productReference
    linkText
    brand
    brandId
    link
    categoryId
    categoryTree {
      id
      cacheId
      href
      slug
      name
      titleTag
      hasChildren
      metaTagDescription
      children {
        id
        cacheId
        href
        slug
        name
        titleTag
        hasChildren
        metaTagDescription
      }
    }
    skuSpecifications {
      field {
        originalName
        name
      }
      values {
        originalName
        name
      }
    }
    clusterHighlights {
      id
      name
    }
    productClusters {
          id
          name
        }
    priceRange {
      sellingPrice {
        highPrice
        lowPrice
      }
      listPrice {
        highPrice
        lowPrice
      }
    }
    properties {
      originalName
      name
      values
    }
    specificationGroups {
      name
      originalName
      specifications {
        name
        originalName
        values
      }
    }
    items {
      itemId
      name
      nameComplete
      complementName
      ean
      kitItems {
        itemId
        amount
        product {
              brand
              categoryId
              categoryTree {
                cacheId
                href
                slug
                id
                name
                titleTag
                hasChildren
                children {
                  cacheId
                  href
                  slug
                  id
                  name
                  titleTag
                }
              }
              clusterHighlights {
                id
                name
              }
              productClusters {
                id
                name
              }
              description
              link
              linkText
              productId
              productName
            }
        sku {
          itemId
          name
          nameComplete
          complementName
          measurementUnit
          unitMultiplier
          images {
            cacheId
            imageId
            imageLabel
            imageTag
            imageUrl
            imageText
          }
          sellers {
            sellerId
            sellerName
            addToCartLink
            sellerDefault
            commertialOffer {
                ...CommertialOfferFragment
              
            }
          }
         
        }
        product {
          brand
          categoryId
          description
          link
          linkText
          productId
          productName
          productReference

          properties {
            originalName
            name
            values
          }
          productClusters {
            id
            name
          }
          categoryTree {
            cacheId
            href
            slug
            id
            name
            titleTag
            metaTagDescription
            hasChildren
            children {
              cacheId
              href
              slug
              id
              name
              titleTag
              metaTagDescription
            }
          }
        }
      }
      variations {
        name
        values
      }
      measurementUnit
      unitMultiplier
      images {
        cacheId
        imageId
        imageTag
        imageUrl
      }
      sellers {
        sellerId
        sellerName
        sellerDefault
        commertialOffer {
          discountHighlights {
            name
          }
          teasers {
            name
            conditions {
              minimumQuantity
              parameters {
                name
                value
              }
            }
            effects {
              parameters {
                name
                value
              }
            }
          }
          Price
          ListPrice
          Tax
          taxPercentage
          spotPrice
          PriceWithoutDiscount
          RewardValue
          PriceValidUntil
          AvailableQuantity
          Installments {
            Value
            InterestRate
            TotalValuePlusInterestRate
            NumberOfInstallments
            Name
            PaymentSystemName
          }
        }
      }
    }
  }
}
`,
  productRecommendations: `fragment CommertialOfferFragment on Offer {
  discountHighlights {
    name
  }
  teasers {
    name
    conditions {
      minimumQuantity
      parameters {
        name
        value
      }
    }
    effects {
      parameters {
        name
        value
      }
    }
  }
  Price
  ListPrice
  Tax
  taxPercentage
  spotPrice
  PriceWithoutDiscount
  RewardValue
  PriceValidUntil
  AvailableQuantity
}
query ProductRecommendations(
$identifier: ProductUniqueIdentifier
$type: CrossSelingInputEnum
) {
productRecommendations(identifier: $identifier, type: $type)
  @context(provider: "vtex.search-graphql") {
  cacheId
  productId
  productName
  productReference
  description
  link
  linkText
  brand
  brandId
  categories
  priceRange {
    sellingPrice {
      highPrice
      lowPrice
    }
    listPrice {
      highPrice
      lowPrice
    }
  }
  specificationGroups {
    name
    originalName
    specifications {
      name
      originalName
      values
    }
  }
  skuSpecifications {
    field {
      name
      originalName
    }
    values {
      name
      originalName
    }
  }
  items {
    name
    itemId
    measurementUnit
    unitMultiplier
    referenceId {
      Value
    }
    images {
      imageId
      imageLabel
      imageTag
      imageUrl
      imageText
    }
    variations {
      name
      values
    }
    sellers {
      sellerId
      sellerName
      addToCartLink
      sellerDefault
      commertialOffer {
        ...CommertialOfferFragment
      }
    }
  }
  clusterHighlights {
    id
    name
  }
  productClusters {
    id
    name
  }
  properties {
    name
    values
  }
}
}`,
  updateProfile: `mutation UpdateProfile($fields: ProfileInput){
  updateProfile(fields: $fields) @context(provider: "vtex.store-graphql"){
    firstName
    lastName
  }
}`,
  orderForm: `query orderForm($orderFormId: ID) {
    orderForm(orderFormId: $orderFormId)
      @context(provider: "vtex.checkout-graphql") {
      id
      customData{
        customApps{
          id
          major
          fields
        }
      }
      items {
        productId
      }
      canEditData
      loggedIn
      userProfileId
      userType
      marketingData{
        utmCampaign
        utmMedium
        utmSource
        utmiCampaign
        utmiPart
        utmiPage
        coupon
        marketingTags
      }
      totalizers { 
        id
        name
        value
      }
      shipping {
        countries
        availableAddresses {
          addressId
          addressType
          city
          complement
          country
          neighborhood
          number
          postalCode
          receiverName
          reference
          state
          street
          isDisposable
          geoCoordinates
        }
        selectedAddress {
          addressId
          addressType
          city
          complement
          country
          neighborhood
          number
          postalCode
          receiverName
          reference
          state
          street
          isDisposable
          geoCoordinates
        }
        deliveryOptions {
          id
          deliveryChannel
          price
          estimate
          isSelected
        }
        pickupOptions {
          id
          address {
            addressId
            addressType
            city
            complement
            country
            neighborhood
            number
            postalCode
            receiverName
            reference
            state
            street
            isDisposable
            geoCoordinates
          }
          deliveryChannel
          price
          estimate
          isSelected
          friendlyName
          additionalInfo
          storeDistance
          transitTime
          businessHours {
            dayNumber
            closed
            closingTime
            openingTime
          }
        }
        isValid
      }
      clientProfileData {
        email
        firstName
        lastName
        document
        documentType
        phone
        isValid
      }
      clientPreferencesData {
        locale
        optInNewsletter
      }
      messages {
        couponMessages {
          code
        }
        generalMessages {
          code
          text
          status
        }
      }
      value
      allowManualPrice
    }
  }
`,
  updateOrderFormShipping: `mutation updateOrderFormShipping(
  $orderFormId: String
  $address: OrderFormAddressInput
) {
  updateOrderFormShipping(orderFormId: $orderFormId, address: $address) @context(provider: "vtex.store-graphql") {
    orderFormId
    isCheckedIn
    checkedInPickupPointId
    shippingData {
      address {
        id
        neighborhood
        complement
        number
        street
        postalCode
        city
        reference
        addressName
        addressType
        geoCoordinates
        state
        receiverName
        country
      }
      availableAddresses {
        id
        neighborhood
        complement
        number
        street
        postalCode
        city
        reference
        addressName
        addressType
        geoCoordinates
        state
        receiverName
        country
      }
    }
  }
}`
}

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher(defaultParams) {
    let params = {
      ...defaultParams,
      options: {
        ...defaultParams.options,
      }
    }
    const actions = {
      [params.template.name]: params.fetch
    }

    if (defaultParams.template?.fetchOptions?.query) {
      params.options.query = queries[defaultParams.template.fetchOptions.query]
    }
    if (defaultParams.template?.fetchOptions?.url) {
      params.options.url = defaultParams.template.fetchOptions.url
      if (defaultParams?.variables?.domain && params.options.url?.match(/[{}]/g)?.length) {
        const richUrl = addVarToString(params.options.url, defaultParams?.variables)
        params.options.url = richUrl
      }
    }
    if (defaultParams.template?.fetchOptions?.method) {
      params.options.method = defaultParams.template.fetchOptions.method
    }


    const execResponses = await ExecHandler(params, actions)
    console.log("RES:", JSON.stringify(execResponses))
    return execResponses;
  },
  useHook:
    ({ fetch }) =>
      (params) => {
        const utils = useCommons()
        return useCallback(async function omniHook(input) {
          try {
            const cpyHooks = input?.hooks
            if (input?.hooks) delete input?.hooks

            const data = await fetch({
              input
            });

            type OmniMiddlewarew = { name: string | number; }


            const middlewaresParser = (middleware: OmniMiddlewarew) => {
              let hook = null
              if (cpyHooks.hasOwnProperty(middleware.name)) {
                hook = cpyHooks[middleware.name]
              } else {
                hook = utils[middleware.name][middleware.function]
              }
              return ({ hook, middleware })
            }

            const middles = params?.businessLogic?.middlewares?.map(middlewaresParser).filter((pred: any) => pred)
            if (middles?.length) {
              for (let index = 0; index < middles.length; index++) {
                const element = middles[index];


                if (cpyHooks.hasOwnProperty(element.middleware.name)) {
            
                  const allParams = element?.middleware?.params?.map((param: string) => {
                    let to = {
                      ...input
                    }
                    if (data.hasOwnProperty(element?.middleware?.dependsOn)) {
                      to = {
                        ...to,
                        ...data[element?.middleware?.dependsOn]
                      }
                    }
                    if (typeof param == 'object') {
                      return parseResponse(to, { to: param }, { exec: () => { }, syncExec: () => { }, }, false);
                    }
                    return addVarToString(param, to)
                  })

                  const middlewareResponse = await element.hook(...allParams)
                } else {
                  // Este parser esta bueno
                  const actionParams = element?.middleware?.params?.map((param: string) => {
                    let to = {
                      ...input
                    }
                    if (data.hasOwnProperty(element?.middleware?.dependsOn)) {
                      to = {
                        ...to,
                        ...data[element?.middleware?.dependsOn]
                      }
                    }
                    if (typeof param == 'object') {
                      return parseResponse(to, { to: param }, { exec: () => { }, syncExec: () => { }, }, false);
                    }
                    return addVarToString(param, to)
                  })

                  const middlewareResponse = await element.hook(...actionParams)
                }
              }
            }
            return data;
          } catch (error) {
            console.log("Error Execution Middleware", error)
            return null
          }
        }, [fetch, params, utils]);
      },
};
