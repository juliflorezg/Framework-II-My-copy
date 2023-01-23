import { FetcherError } from "../../kernel/utils/errors";

export function getError(errors: any[] | null, status: number) {
  console.log("Fetch ERROR", errors, status)
  errors = errors ?? [{ message: 'Failed to fetch' }];
  return new FetcherError({ errors, status });
}

export async function getAsyncError(res: Response) {
  const data = await res.json();
  return getError(data.errors, res.status);
}

const handleFetchResponse = async (res: Response) => {
  if (res.ok) {
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const cookies = res.headers.get("set-cookie")
    
    const response = isJson ? await res.json() :  {
      cookies,
      url: res.url
    }
 
    if (response?.errors && response?.errors.length) {
      throw getError(response.errors, res.status);
    }

    return response?.data || response;
  }

  throw await getAsyncError(res);
};

export default handleFetchResponse;
