  
  
  // Send Success Response In FrontEnd
  const sendResponse = (res, data) => {
    const responseData = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message || null,
      data: data.data || null || undefined,
      totalData: data.totalData || null || undefined
    };
  
    res.status(data.statusCode).json(responseData);
  };
  
  module.exports =  sendResponse;

//   total for pagination