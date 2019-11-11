const ResponseJsonHelper = {
  errorResponse: (status: number) => {
    return {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      statusCode: status,
    };
  },
  okResponse: (response: any, isString?: boolean) => {
    const parsedResponse = isString ? response : JSON.stringify(response);
    return {
      body: parsedResponse,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      statusCode: 200,
    };
  },
};

export default ResponseJsonHelper;