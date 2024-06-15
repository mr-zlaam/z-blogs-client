const apiResponse = (
  status: number,
  message: string = "OK",
  data: object | null | object[] = null,
  metaData: object | null | object[] = null,
  optMessage: string = ""
) => {
  return {
    success: status < 400,
    statusCode: status,
    message: message,
    data: data,
    optMessage: optMessage,
    metaData: metaData,
  };
};
export { apiResponse };
