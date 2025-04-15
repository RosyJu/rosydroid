exports.handler = async (event, context) => {
    try {
      const response = await fetch(
        `https://mc3jpbhw42.re.qweatherapi.com/v7/weather/3d?location=101010100&key=8651d36537bb41508d195715144bb976`
      );
      
      // 解析响应数据
      const data = await response.json();
      
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      // 错误处理
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  };