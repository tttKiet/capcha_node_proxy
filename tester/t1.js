return await (async function t() {
  try {
    var myHeaders = {
      Accept: "application/json",
      "Accept-Language": "ru-RU,ru;q=0.9",
      "Content-Type": "application/json",
    };

    const va1 = JSON.stringify({
      key: "6cfea617e6664d898b48c06a21f43179",
      type: "imagetotext",
      img: "https://cdn.discordapp.com/ephemeral-attachments/1201049969990316032/1262019922989420698/npdcob0qmd4tu3n2jcwc.png?ex=66951324&is=6693c1a4&hm=c1017a85b75064ce13cbd6009be845751d41c7014d0514b8e0edd5f90e9cc860&",
      module: "common",
      casesensitive: "false",
    });

    var raw = JSON.stringify({
      key: "$k1",
      type: "imagetotext",
      img: "$imgLink",
      module: "common",
      casesensitive: false,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch("http://localhost:3000/cap", requestOptions);
    console.log("Is Ok: ", response.ok);
    console.log("Response: ", response);
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
