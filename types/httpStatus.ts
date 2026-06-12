export enum HttpStatusType {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
}

export const HttpStatusTypeLabels: Record<HttpStatusType, string> = {
  [HttpStatusType.BAD_REQUEST]: "Requisição inválida.",
  [HttpStatusType.UNAUTHORIZED]: "Não autorizado.",
  [HttpStatusType.FORBIDDEN]: "Proibido.",
  [HttpStatusType.CONFLICT]: "Conflito.",
  [HttpStatusType.UNPROCESSABLE_ENTITY]: "Erro no processamento dos dados.",
};
