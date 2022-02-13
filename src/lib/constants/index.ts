export enum Errors {
  Http_error = "HTTP Error",
  ctr_error = "Controller Error",
  Database = "Database Error",
  Server = "Server Error",
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export enum Http {
  GET = "GET",
  POST = "POST",
  PATH = "PATCH",
  DELETE = "DELETE",
  BLANK = "_",
}

export enum Paths {
  root = "/",
  api = "/api",
  health = "/health",
  testresult = "/testresult",
}
