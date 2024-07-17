const Jimp = require("jimp");

async function handleImageDiscord(url) {
  // URL của hình ảnh
  const imageUrl = url;
  const outputImagePath = "image.png";

  // Màu trung tâm để so sánh
  const targetColor = Jimp.cssColorToHex("#32cf7e");

  // Màu nền mới
  const newBackgroundColor = Jimp.cssColorToHex("#fff");
  const newBackgroundColor2 = Jimp.cssColorToHex("#999");

  // Khoảng sai số cho phép để xác định phạm vi màu (ví dụ: ±30 cho mỗi kênh màu)
  const tolerance = 50;

  // Hàm tính khoảng cách màu
  function colorDistance(color1, color2) {
    const r1 = (color1 >> 24) & 0xff;
    const g1 = (color1 >> 16) & 0xff;
    const b1 = (color1 >> 8) & 0xff;

    const r2 = (color2 >> 24) & 0xff;
    const g2 = (color2 >> 16) & 0xff;
    const b2 = (color2 >> 8) & 0xff;

    return Math.sqrt(
      (r2 - r1) * (r2 - r1) + (g2 - g1) * (g2 - g1) + (b2 - b1) * (b2 - b1)
    );
  }

  try {
    const image = await Jimp.read(imageUrl);

    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        // Lấy các giá trị RGBA của mỗi pixel
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        const alpha = this.bitmap.data[idx + 3];

        // Chuyển đổi màu hiện tại sang định dạng ARGB
        const currentColor = Jimp.rgbaToInt(red, green, blue, alpha);

        // Kiểm tra nếu màu hiện tại không nằm trong phạm vi màu mục tiêu
        if (colorDistance(currentColor, targetColor) > tolerance) {
          // Thay đổi màu thành màu nền mới
          const newRed = (newBackgroundColor >> 24) & 0xff;
          const newGreen = (newBackgroundColor >> 16) & 0xff;
          const newBlue = (newBackgroundColor >> 8) & 0xff;
          const newAlpha = newBackgroundColor & 0xff;

          this.bitmap.data[idx + 0] = newRed; // red
          this.bitmap.data[idx + 1] = newGreen; // green
          this.bitmap.data[idx + 2] = newBlue; // blue
          this.bitmap.data[idx + 3] = newAlpha; // alpha
        }
      }
    );

    // //
    // const width = image.bitmap.width;
    // const height = image.bitmap.height;

    // let longestLineLength = 0;
    // let longestLinePixels = [];

    // for (let y = 0; y < height; y++) {
    //   for (let x = 0; x < width; x++) {
    //     const idx = image.getPixelIndex(x, y);
    //     const color = Jimp.intToRGBA(image.bitmap.data.readUInt32BE(idx));

    //     const currentColor = Jimp.rgbaToInt(color.r, color.g, color.b, color.a);

    //     if (colorDistance(currentColor, targetColor) > tolerance) continue;

    //     // Duyệt theo chiều ngang và chiều xéo để tìm thanh ngang
    //     let linePixels = [];
    //     let curX = x;
    //     let curY = y;

    //     while (curX < width && curY < height) {
    //       const curIdx = image.getPixelIndex(curX, curY);
    //       const curColor = Jimp.intToRGBA(
    //         image.bitmap.data.readUInt32BE(curIdx)
    //       );
    //       const curColorInt = Jimp.rgbaToInt(
    //         curColor.r,
    //         curColor.g,
    //         curColor.b,
    //         curColor.a
    //       );

    //       if (colorDistance(curColorInt, targetColor) > tolerance) break;

    //       linePixels.push({ x: curX, y: curY });
    //       curX++;
    //       curY++;
    //     }

    //     if (linePixels.length > longestLineLength) {
    //       longestLineLength = linePixels.length;
    //       longestLinePixels = linePixels;
    //     }
    //   }
    // }

    // console.log("Longest line length:", longestLinePixels);

    // // Thay đổi màu của thanh ngang dài nhất
    // longestLinePixels.forEach((pixel) => {
    //   const idx = image.getPixelIndex(pixel.x, pixel.y);
    //   image.bitmap.data.writeUInt32BE(newBackgroundColor2, idx);
    // });

    // //


    
    image.writeAsync(outputImagePath);

    return image.getBase64Async(Jimp.MIME_PNG);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { handleImageDiscord };
