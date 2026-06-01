import ApiManager from './apiManager';

export async function getApi(apiName, params) {
  try {
    const result = await ApiManager.get(apiName, {
      params,
    });
    console.info(JSON.stringify({apiName, params, result}));
    return result;
  } catch (error) {
    console.log('error', {apiName, params, error});
    return error?.response;
  }
}
