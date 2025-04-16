exports.handler = async (event, context) => {
  try {
    console.log(event.queryStringParameters.location)
    const response = await fetch(
      `https://mc3jpbhw42.re.qweatherapi.com/v7/grid-weather/now?location=${event.queryStringParameters.location}&key=8651d36537bb41508d195715144bb976`
    );

    // 检查请求是否成功
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Request failed with status ${response.status}` }),
      };
    }

    // 解析响应数据
    const data = await response.json();
    // 检查返回的数据是否有效
    if (!data || Object.keys(data).length === 0) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Received empty or invalid data from the API' }),
      };
    }

    // 如果数据有效，则返回
    // console.log(data)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // 错误处理
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    };
  }
};