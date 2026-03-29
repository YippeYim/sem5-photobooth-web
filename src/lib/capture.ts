export async function createPhotoStrip(
  photos: string[],
  framePath: string
): Promise<string> {
  const frame = await loadImage(framePath);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = frame.width;
  canvas.height = frame.height;

  // วาด frame ลง canvas
  ctx.drawImage(frame, 0, 0);

  // =========================
  // 🔥 อ่าน pixel ของ frame
  // =========================
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // หาโซนสีดำ (ช่องรูป)
  const boxes: { x: number; y: number; w: number; h: number }[] = [];
  const visited = new Set<string>();

  function isBlack(i: number) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    return r < 30 && g < 30 && b < 30; // threshold
  }

  function floodFill(startX: number, startY: number) {
    const stack = [[startX, startY]];
    let minX = startX,
      maxX = startX,
      minY = startY,
      maxY = startY;

    while (stack.length) {
      const [x, y] = stack.pop()!;
      const key = `${x},${y}`;
      if (visited.has(key)) continue;
      visited.add(key);

      const idx = (y * canvas.width + x) * 4;
      if (!isBlack(idx)) continue;

      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);

      if (x > 0) stack.push([x - 1, y]);
      if (x < canvas.width - 1) stack.push([x + 1, y]);
      if (y > 0) stack.push([x, y - 1]);
      if (y < canvas.height - 1) stack.push([x, y + 1]);
    }

    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY,
    };
  }

  // loop หา box
  for (let y = 0; y < canvas.height; y += 5) {
    for (let x = 0; x < canvas.width; x += 5) {
      const idx = (y * canvas.width + x) * 4;
      const key = `${x},${y}`;
      if (!visited.has(key) && isBlack(idx)) {
        const box = floodFill(x, y);

        // กัน noise (ต้องใหญ่พอ)
        if (box.w > 100 && box.h > 100) {
          boxes.push(box);
        }
      }
    }
  }

  // เรียงจากบนลงล่าง
  boxes.sort((a, b) => a.y - b.y);

  // =========================
  // 🔥 วาดรูปลงแต่ละช่อง
  // =========================
  for (let i = 0; i < photos.length; i++) {
    const img = await loadImage(photos[i]);
    const box = boxes[i];
    if (!box) continue;

    drawImageCover(ctx, img, box.x, box.y, box.w, box.h);
  }

  // วาด frame ทับ
  ctx.drawImage(frame, 0, 0);

  return canvas.toDataURL("image/png");
}

// =========================
// 📌 helper
// =========================

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => resolve(img);
  });
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const boxRatio = w / h;

  let sx = 0,
    sy = 0,
    sw = img.width,
    sh = img.height;

  if (imgRatio > boxRatio) {
    sw = img.height * boxRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / boxRatio;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}