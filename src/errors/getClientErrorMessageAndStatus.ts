'use server';

// import { ErrorObject } from '@/hooks/useToast';
import { AxiosError } from 'axios';
import { ApiError } from '@/generated/schema/index';
import getErrorMessageAndStatus from './getErrorMessageAndStatus';

export const defaultErrorMessages = {
  500: 'Something went wrong and we cannot process your request',
  400: 'We are having issues processing your request',
  404: 'We cannot find the data you are requesting',
  409: 'Conflict',
  401: 'Unauthorized',
  403: 'You are not authorized to perform that action',
  default: 'Something went wrong, please try again later'
};

const getClientErrorMessageAndStatus = (e: ApiError | AxiosError): any => {
  const awsEnv = 'AWS_ENV';
  const environment = process.env[awsEnv];
  const devMode =
    environment === 'Local' ||
    environment === 'Development' ||
    environment === 'Test';
  const { status, message, additionalExceptionResponse } =
    getErrorMessageAndStatus(e);
  let toastMessage: string = '';
  switch (status) {
    case 500: {
      toastMessage = defaultErrorMessages[500];
      break;
    }
    case 400: {
      toastMessage = defaultErrorMessages[400];
      break;
    }
    case 404: {
      toastMessage = defaultErrorMessages[404];
      break;
    }
    case 409: {
      // We want to return meaningful error messages here since this is business-related conflict
      toastMessage = message;
      break;
    }
    case 401: {
      toastMessage = defaultErrorMessages[401];
      break;
    }
    case 403: {
      toastMessage = defaultErrorMessages[403];
      break;
    }
    default: {
      toastMessage = defaultErrorMessages.default;
    }
  }

  return devMode
    ? { status, message, additionalExceptionResponse }
    : {
        status,
        message: toastMessage,
        additionalExceptionResponse
      };
};

export default getClientErrorMessageAndStatus;
