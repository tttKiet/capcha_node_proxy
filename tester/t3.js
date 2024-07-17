const handleImageDiscord = require("../src/until/index").handleImageDiscord;

async function t() {
  try {
    var myHeaders = {
      Accept: "application/json",
      "Accept-Language": "ru-RU,ru;q=0.9",
      "Content-Type": "application/json",
    };

    const ln =
      "https://cdn.discordapp.com/ephemeral-attachments/1248219367372623903/1263027709945319455/wickCaptcha.png?ex=6698bdb7&is=66976c37&hm=ac0d3242f997beeb36f13bf43b547d16f01269f56a9c02c066f989283667ff3d&";

    const image = await handleImageDiscord(ln);
    // const va1 = JSON.stringify({
    //   key: "6cfea617e6664d898b48c06a21f43179",
    //   type: "imagetotext",
    //   img: image,
    //   module: "common",
    //   casesensitive: "false",
    // });

    // var raw = JSON.stringify({
    //   key: "$k1",
    //   type: "imagetotext",
    //   img: "$imgCaptchaUrl",
    //   module: "common",
    //   casesensitive: true,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: va1,
    //   redirect: "follow",
    // };
    // const response = await fetch(
    //   "http://127.0.0.1:3000/cap/discord-susscint",
    //   requestOptions
    // );
    // // console.log("Is Ok: ", response.ok);
    // // console.log("Response: ", response);
    // const responseData = await response.json();
    // console.log("response.json(): ", responseData);
    // if (!response.ok) {
    //   throw new Error("Lỗi không xác định.");
    // }
    // return responseData.captcha.toUpperCase();
  } catch (error) {
    console.log("Error__: ", [error]);
  }
}

t();
