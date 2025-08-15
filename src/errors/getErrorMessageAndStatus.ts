'use client';

import { AxiosError } from 'axios';
import { ApiError } from '@/generated/schema/index';

const getErrorMessageAndStatus = (e: ApiError | AxiosError): any => {
  const isAxios = e instanceof AxiosError;
  const status = (isAxios ? e.response?.status : e.status) || 500;
  let message: string = '';
  let additionalExceptionResponse: object = {};

  if (status === 500) {
    message = 'Something went wrong and we cannot process your request';
  } else {
    if (isAxios) {
      // Sometimes, there is an errors object inside exceptionMessage
      let errorObject = (e?.response?.data as any)?.responseException
        ?.exceptionMessage?.errors;
      // If not
      if (!errorObject)
        errorObject = (e?.response?.data as any)?.responseException
          ?.exceptionMessage;

      if (typeof errorObject === 'object') {
        Object.entries(errorObject).forEach(([_key, value]) => {
          message += (value as string[]).join(',');
        });
      } else if (typeof errorObject === 'string') {
        message = errorObject;
      }
    } else {
      // ApiError
      if (
        e.body?.responseException?.exceptionMessage?.errors &&
        typeof e.body?.responseException?.exceptionMessage?.errors === 'object'
      ) {
        message = Object.values(
          e.body?.responseException?.exceptionMessage?.errors
        )
          .flat()
          .join(',');
      } else {
        const {
          message: msg,
          exceptionMessage: exceptionMessage,
          ...ErrorObject
        } = e.body?.responseException || {};
        message = msg || exceptionMessage;
        additionalExceptionResponse =
          Object.keys({ ...ErrorObject }).length === 0
            ? null
            : { ...ErrorObject };
      }
    }
  }

  return {
    status,
    message,
    additionalExceptionResponse
  };
};

export default getErrorMessageAndStatus;
