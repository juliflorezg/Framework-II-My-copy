import * as yup from 'yup';

export const stringToRegex = (str) => {
  // Main regex
  const main = str.match(/\/(.+)\/.*/)[1];

  // Regex options
  const options = str.match(/\/.+\/(.*)/)[1];

  // Compiled regex
  return new RegExp(main, options);
};

export const getParams = (params: any, type: string) => {
  return params?.map((param, index) => {
    if ((param?.type, param?.params)) {
      if (type === 'oneOf') return [yup[param?.type](...param.params)];
      else return yup[param?.type](...param.params);
    } else {
      if (type === 'matches') {
        if (index === 0 && typeof param === 'string') {
          return stringToRegex(param);
        }
      }
    }

    return param;
  });
};

export function createYupSchema(
  schema: { [x: string]: any },
  config: { id: any; validationType: any; validations?: never[] | undefined }
) {
  const { id, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }

  let validator = yup[validationType]();
  validations?.forEach((validation: { params: any; type: any }) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }

    validator = validator[type](...getParams(params, type));
  });
  schema[id] = validator;
  return schema;
}
