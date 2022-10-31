export enum ErrorTypes {
  ObjectNotFound = 'ObjectNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = {
  message: string;
  httpStatus: number
};

// export type ErrorCatalog = {
//   [key in ErrorTypes]: ErrorResponseObject
// };

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};

// código retirado do código da aula 30.2 (https://github.com/tryber/sd-020-a-live-lectures/tree/lecture/30.2/glassesStore)