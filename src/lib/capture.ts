export async function createPhotoStrip(
  images: string[],
  frameSrc: string
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const count = images.length;

  let positions: any[] = [];

  if (count === 2) {
    canvas.width = 1080;
    canvas.height = 1920;

    positions = [
      { x: 120, y: 250, w: 840, h: 500 },
      { x: 120, y: 950, w: 840, h: 500 },
    ];
  } else if (count === 3) {
    canvas.width = 1080;
    canvas.height = 1920;

    positions = [
      { x: 120, y: 180, w: 840, h: 400 },
      { x: 120, y: 780, w: 840, h: 400 },
      { x: 120, y: 1380, w: 840, h: 400 },
    ];
  } else if (count === 4) {
    canvas.width = 1080;
    canvas.height = 1400;

    positions = [
      { x: 100, y: 180, w: 380, h: 300 },
      { x: 600, y: 180, w: 380, h: 300 },
      { x: 100, y: 600, w: 380, h: 300 },
      { x: 600, y: 600, w: 380, h: 300 },
    ];
  } else if (count === 6) {
    canvas.width = 1080;
    canvas.height = 1600;

    positions = [
      { x: 100, y: 120, w: 380, h: 250 },
      { x: 600, y: 120, w: 380, h: 250 },
      { x: 100, y: 450, w: 380, h: 250 },
      { x: 600, y: 450, w: 380, h: 250 },
      { x: 100, y: 780, w: 380, h: 250 },
      { x: 600, y: 780, w: 380, h: 250 },
    ];
  }

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = images[i];
    await new Promise((res) => (img.onload = res));

    const p = positions[i];
    if (!p) continue;

    ctx.drawImage(img, p.x, p.y, p.w, p.h);
  }

  const frame = new Image();
  frame.src = frameSrc;
  await new Promise((res) => (frame.onload = res));

  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/png");
}