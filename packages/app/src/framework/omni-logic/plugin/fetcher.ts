/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import { API_URL } from './const';
import { handleFetchResponse } from "./utils";
import fetch from "cross-fetch";
import { Fetcher } from "../kernel/utils/types";
import { API_URL } from "@vercel/commerce-shopify/const";
import CookieManager, { Cookies } from "@react-native-cookies/cookies";
import { Platform } from "react-native";

const generateCookies = async (url: string) => {
  let cookies = "";
  const allWebCookies = await CookieManager.get(url);

  for (const [_, { name, value }] of Object.entries(allWebCookies)) {
    cookies += `${name}=${value}; `;
  }
  return cookies;
};

const setCachedCookies = async (
  cachedCookies: Cookies | null,
  url: string,
  withCookies: boolean
) => {
  if (cachedCookies && !withCookies) {
    const keys = Object.keys(cachedCookies);

    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      console.log(url, cachedCookies[element])
      await CookieManager.set(url, cachedCookies[element]);
    }
  }
};

const fetcher: Fetcher = async ({
  url = API_URL,
  method = "POST",
  variables,
  query,
  headerOptions,
  ignoreCookies = [],
  withCookies = true,
  env
}) => {
  const { locale, ...vars } = variables ?? {};
  console.log("Current Domain", env?.domain)
  const Cookie = await generateCookies(env?.domain || url);

  const defaultHeaderOptions = {
    Accept: "application/json",
    "Content-Type": "application/json",
    //'X-Shopify-Storefront-Access-Token': API_TOKEN!,
  };

  let headers = new Headers(
    headerOptions ? headerOptions : defaultHeaderOptions
  );
  let cachedCookies = null;

  if (withCookies) headers.append("Cookie", Cookie);
  else {
    cachedCookies = await CookieManager.get(env?.domain || url);
    await CookieManager.clearAll();
  }

  let fetcherOptions = {
    method,
    headers,
    ...(locale && {
      "Accept-Language": locale,
    }),
  };
  console.log("Query:", url, vars, headers.get("Cookie"));
  if (query && vars) {
    fetcherOptions.body = JSON.stringify({ query, variables: vars });
  }
  //@ts-ignore
  else if (
    vars &&
    headers.get("Content-Type") === "application/x-www-form-urlencoded"
  ) {
    var formBody = [];
    for (var property in vars) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(vars[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    if (fetcherOptions.method === "GET") {
      url += `?${formBody.join("&")}`;
    } else {
      fetcherOptions.body = formBody.join("&");
    }
  } else if (vars) {
    if (Object.keys(vars).length) {
      fetcherOptions.body = JSON.stringify(vars);
    }
  }

  try {
    const fetchResponse = handleFetchResponse(await fetch(url, fetcherOptions));

    await setCachedCookies(cachedCookies, env?.domain || url, withCookies);
    return fetchResponse;
  } catch (e) {
    await setCachedCookies(cachedCookies, env?.domain || url, withCookies);
  }
};

export default fetcher;
