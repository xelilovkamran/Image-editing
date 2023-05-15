const img = document.getElementById("image");
const ranges = document.querySelectorAll(".range-output > input");
const fileEl = document.getElementById("addImage");
const save = document.querySelector(".saveImage");
const reset = document.querySelector(".reset");
const arrows = document.querySelectorAll(".rotation-buttons div");

const [saturation, blur, brightness, contrast] = ranges;

const [vertical, horizontal, right, left] = arrows;

const outputs = document.querySelectorAll(".output");

let degree = 0;
let flipX = 1;
let flipY = 1;

const writeRanges = () => {
  for (let i = 0; i < 4; i++) {
    outputs[i].innerHTML = `${ranges[i].value}`;
  }
};

const initEl = () => {
  img.style.filter = `saturate(100%) blur(0px) brightness(100%) contrast(100%)`;
  img.style.transform = `rotate(0) scale(1, 1)`;
};

const resetRanges = () => {
  saturation.value = 100;
  blur.value = 0;
  brightness.value = 100;
  contrast.value = 100;
  degree = 0;
  flipX = 1;
  flipY = 1;
};

saturation.addEventListener("input", () => {
  img.style.filter = `saturate(${saturation.value}%) blur(${blur.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%)`;
  writeRanges();
});
blur.addEventListener("input", () => {
  img.style.filter = `saturate(${saturation.value}%) blur(${blur.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%)`;
  writeRanges();
});
brightness.addEventListener("input", () => {
  img.style.filter = `saturate(${saturation.value}%) blur(${blur.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%))`;
  writeRanges();
});
contrast.addEventListener("input", () => {
  img.style.filter = `saturate(${saturation.value}%) blur(${blur.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%)`;
  writeRanges();
});

right.addEventListener("click", () => {
  degree += 90;
  img.style.transform = `rotate(${degree}deg)`;
});

left.addEventListener("click", () => {
  degree -= 90;
  img.style.transform = `rotate(${degree}deg)`;
});

horizontal.addEventListener("click", () => {
  if (flipX === 1) {
    flipX -= 2;
  } else {
    flipX += 2;
  }
  img.style.transform = `scale(${flipX}, ${flipY})`;
});

vertical.addEventListener("click", () => {
  if (flipY === 1) {
    flipY -= 2;
  } else {
    flipY += 2;
  }
  img.style.transform = `scale(${flipX}, ${flipY})`;
});

reset.addEventListener("click", () => {
  initEl();
  resetRanges();
});

fileEl.addEventListener("change", () => {
  let file = fileEl.files[0];
  if (!file) return;
  img.src = URL.createObjectURL(file);
  initEl();
  resetRanges();
  writeRanges();
});

save.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.filter = `saturate(${saturation.value}%) blur(${blur.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (degree !== 0) {
    ctx.rotate((degree * Math.PI) / 180);
  }
  ctx.scale(flipX, flipY);
  ctx.drawImage(
    img,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "ResultImage.jpg";
  link.href = canvas.toDataURL();
  link.click();
});
