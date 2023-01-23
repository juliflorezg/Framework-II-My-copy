import Cookie from "@react-native-cookies/cookies";

const CookieManager = {
  getCookie: async (url: string): Promise<any> => {
    try {
      const cookie = await Cookie.get(url);
      console.log(cookie)
      return cookie;
    } catch (e) {
      return { success: false, error: e };
    }
  },
  setCookie: async (
    url: string,
    options: {
      name: string;
      value: string;
      path: string;
      version: string;
      expires: string;
      secure: boolean;
      httpOnly: boolean;
    }
  ): Promise<any> => {
    try {
      await Cookie.set(url, options, true);
      return { success: true };
    } catch (e) {
      // saving error
      return { success: false, error: e };
    }
  },
  delete: async (url: string, cookieName: string ) => {
    try {
      await Cookie.clearByName(url, cookieName)
      return { success: true };
    } catch(e) {
      return { success: false, error: e };
    }
  },
  deleteAll: async () => {
    try {
      await Cookie.clearAll();
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  },
};

export default CookieManager;
