return await (async function t() {
  try {
    var myHeaders = {
      Accept: "application/json",
      "Accept-Language": "ru-RU,ru;q=0.9",
      "Content-Type": "application/json",
    };
    var raw = JSON.stringify({
      key: "$k1",
      type: "imagetotext",
      img: "$imgCaptchaUrl",
      module: "common",
      casesensitive: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "http://127.0.0.1:3000/cap/discord-susscint",
      requestOptions
    );
    const responseData = await response.json();
    console.log("response.json(): ", responseData);
    if (!response.ok) {
      throw new Error("Lỗi không xác định.");
    }
    return responseData.captcha.toUpperCase();
  } catch (error) {
    console.log("Error__: ", [error]);
  }
})();
