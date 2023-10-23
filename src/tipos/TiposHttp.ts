type TipoRequestBody<T> = Omit<T, "id">;

type TipoResponseBody<T, Keys extends keyof T> = {
  data?: Pick<T, Keys> | Pick<T, Keys>[];
  error?: unknown;
};

type TipoRequestParams = {
  id?: string;
};

export { TipoRequestBody, TipoRequestParams, TipoResponseBody };
