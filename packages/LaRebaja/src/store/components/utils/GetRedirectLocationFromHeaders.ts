import RNFetchBlob from 'rn-fetch-blob-v2'
import getURLParams from './getUrlParams'

const GetRedirectLocationFromHeaders = async (url: string) => {
    const fetchResponse = await RNFetchBlob.config({followRedirect: false}).fetch("GET", url)
    const locationRedirect = fetchResponse?.respInfo?.headers.Location
    const state = getURLParams("state", locationRedirect)
    const client_id = getURLParams("client_id", locationRedirect)
    return {
        state,
        client_id
    }
}

export default GetRedirectLocationFromHeaders