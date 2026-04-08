import confetti from 'canvas-confetti';

export const processDownload = (imageSrc, fileName, rotation, flipH, flipV) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const rad = (rotation * Math.PI) / 180;
      
      const absCos = Math.abs(Math.cos(rad));
      const absSin = Math.abs(Math.sin(rad));
      const newW = img.width * absCos + img.height * absSin;
      const newH = img.width * absSin + img.height * absCos;

      canvas.width = newW;
      canvas.height = newH;

      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(false);

      ctx.translate(newW / 2, newH / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      const ext = fileName.split('.').pop().toLowerCase();
      const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
      const downloadName = `edited_${fileName.replace(`.${ext}`, '')}.${ext === 'jpg' ? 'jpg' : 'png'}`;

      const link = document.createElement('a');
      link.download = downloadName;
      link.href = canvas.toDataURL(mimeType, 0.95);
      link.click();
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#2563eb', '#60a5fa', '#ffffff']
      });

      resolve(true);
    };
    img.src = imageSrc;
  });
};

export const normalizeAngle = (angle) => ((angle % 360) + 360) % 360;

export const getEffectiveOrientation = (w, h, rotation) => {
  const normAngle = normalizeAngle(rotation);
  const isSwapped = (normAngle > 45 && normAngle < 135) || (normAngle > 225 && normAngle < 315);
  const effectiveW = isSwapped ? h : w;
  const effectiveH = isSwapped ? w : h;
  return {
    effectiveW,
    effectiveH,
    orientation: effectiveW >= effectiveH ? 'Landscape' : 'Portrait'
  };
};
