const JoiErrorFormatter = (error) => {
    const message = {};
    error.details?.forEach((item) => {
      message[item.context.label] = item.message?.replaceAll('"', "");
    });
    error.message = message;
    error.status = 422;
  };
  
  export default { JoiErrorFormatter };
  