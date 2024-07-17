var express = require("express");
var router = express.Router();
const handleImageDiscord = require("../src/until/index").handleImageDiscord;

router.post("/discord-susscint", async function (req, res, next) {
  const { key, type, img, module, casesensitive = false } = req.body;
  console.log("POST: ", { key, type, img, module, casesensitive });

  if (!key || !type || !img || !module) {
    return res.status(400).json({ msg: "Vui lòng chuyền đủ tham số." });
  }
  const imgConvert = await handleImageDiscord(img);

  try {
    const response = await fetch("https://autocaptcha.pro/apiv3/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...req.body, casesensitive, img: imgConvert }),
    });
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async function (req, res, next) {
  const { key, type, img, module, casesensitive = false } = req.body;
  if (!key || !type || !img || !module) {
    return res.status(400).json({ msg: "Vui lòng chuyền đủ tham số." });
  }
  try {
    const response = await fetch("https://autocaptcha.pro/apiv3/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...req.body, casesensitive }),
    });
    const data = await response.json();
    console.log(data);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
