import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';

export interface ContactSheetImage {
  src: string;
  title?: string;
  caption?: string;
  aspect?: number;
}

export interface ContactSheetRef {
  boost: (amount: number) => void;
  open: (index?: number) => void;
  close: () => void;
}

export interface ContactSheetProps {
  images: (string | ContactSheetImage)[];
  count?: number;
  speed?: number;
  rush?: number;
  spiral?: number;
  blankArea?: number;
  size?: number;
  sizeVariance?: number;
  aspect?: number;
  radius?: number;
  border?: number;
  borderColor?: string;
  rim?: number;
  roll?: number;
  develop?: boolean | number;
  shadow?: boolean;
  edgeFade?: boolean;
  backgroundColor?: string;
  paused?: boolean;
  dpr?: number;
  ariaLabel?: string;
  onOpen?: (index: number) => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface PhotoInstance {
  imageIndex: number;
  progress: number; // 0 (center) to 1 (outer edge)
  angle: number;
  speedFactor: number;
  sizeFactor: number;
  aspectRatio: number;
  rotation: number;
  rotSpeed: number;
  seed: number;
}

export const ContactSheet = forwardRef<ContactSheetRef, ContactSheetProps>(
  (
    {
      images,
      count = 18,
      speed = 0.1,
      rush = 0.35,
      spiral = 0,
      blankArea = 0.2,
      size = 140,
      sizeVariance = 0.2,
      aspect = 1.33,
      radius = 8,
      border = 4,
      borderColor = '#ffffff',
      rim = 10,
      roll = 0.15,
      develop = true,
      shadow = true,
      edgeFade = true,
      backgroundColor = '#0C0C0C',
      paused = false,
      dpr,
      ariaLabel = 'Contact Sheet Photographic Stream',
      onOpen,
      onClose,
      className = '',
      style,
      children,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(performance.now());
    const boostVelocityRef = useRef<number>(0);

    const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Normalize image list
    const normalizedImages = useRef<ContactSheetImage[]>([]);
    normalizedImages.current = images.map((item) =>
      typeof item === 'string' ? { src: item } : item
    );

    // Preload HTMLImageElement instances
    useEffect(() => {
      let isMounted = true;
      const loaded: HTMLImageElement[] = [];

      const promises = normalizedImages.current.map((item, idx) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.referrerPolicy = 'no-referrer';
          img.src = item.src;
          img.onload = () => {
            loaded[idx] = img;
            resolve();
          };
          img.onerror = () => {
            // Draw dummy placeholder if external image fails
            const fallbackCanvas = document.createElement('canvas');
            fallbackCanvas.width = 400;
            fallbackCanvas.height = 300;
            const ctx = fallbackCanvas.getContext('2d');
            if (ctx) {
              const grad = ctx.createLinearGradient(0, 0, 400, 300);
              grad.addColorStop(0, '#1c1e24');
              grad.addColorStop(1, '#0c0c0c');
              ctx.fillStyle = grad;
              ctx.fillRect(0, 0, 400, 300);
              ctx.fillStyle = '#BBCCD7';
              ctx.font = 'bold 20px Kanit, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(item.title || `Frame ${(idx + 1).toString().padStart(2, '0')}`, 200, 150);
            }
            const fallbackImg = new Image();
            fallbackImg.src = fallbackCanvas.toDataURL();
            fallbackImg.onload = () => {
              loaded[idx] = fallbackImg;
              resolve();
            };
          };
        });
      });

      Promise.all(promises).then(() => {
        if (isMounted) {
          setLoadedImages(loaded);
        }
      });

      return () => {
        isMounted = false;
      };
    }, [images]);

    // Initialize photo instances pool
    const photosRef = useRef<PhotoInstance[]>([]);
    useEffect(() => {
      const activeCount = Math.min(Math.max(count, 4), 96);
      const newPhotos: PhotoInstance[] = [];

      for (let i = 0; i < activeCount; i++) {
        const progress = (i / activeCount);
        const baseAngle = (i / activeCount) * Math.PI * 2 * 3; // spread evenly
        const imgIndex = i % Math.max(normalizedImages.current.length, 1);
        const imgAspect = normalizedImages.current[imgIndex]?.aspect || aspect;

        newPhotos.push({
          imageIndex: imgIndex,
          progress,
          angle: baseAngle,
          speedFactor: 0.85 + Math.random() * 0.3,
          sizeFactor: 1 - sizeVariance + Math.random() * (sizeVariance * 2),
          aspectRatio: imgAspect,
          rotation: (Math.random() - 0.5) * roll,
          rotSpeed: (Math.random() - 0.5) * 0.05 * roll,
          seed: Math.random(),
        });
      }
      photosRef.current = newPhotos;
    }, [count, aspect, roll, sizeVariance]);

    // Imperative ref methods
    useImperativeHandle(ref, () => ({
      boost: (amount: number) => {
        boostVelocityRef.current += amount;
      },
      open: (index?: number) => {
        const target = index ?? 0;
        setSelectedIndex(target);
        onOpen?.(target);
      },
      close: () => {
        setSelectedIndex(null);
        onClose?.();
      },
    }));

    // Mouse wheel / pointer boost
    const handleWheel = useCallback((e: React.WheelEvent) => {
      // Don't stop native page scroll, but take a percentage for momentum
      boostVelocityRef.current += (e.deltaY > 0 ? 0.08 : -0.08);
    }, []);

    // Main rendering loop
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const render = (time: number) => {
        const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
        lastTimeRef.current = time;

        const effectiveDpr = dpr || Math.min(window.devicePixelRatio || 1, 2);
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (canvas.width !== width * effectiveDpr || canvas.height !== height * effectiveDpr) {
          canvas.width = width * effectiveDpr;
          canvas.height = height * effectiveDpr;
        }

        ctx.save();
        ctx.scale(effectiveDpr, effectiveDpr);

        // Clear background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const maxDist = Math.hypot(width, height) / 2;

        // Apply decay to boost velocity
        boostVelocityRef.current *= 0.94;
        const effectiveSpeed = reducedMotion
          ? 0.01
          : (paused ? 0 : speed) + boostVelocityRef.current;

        // Sort photos by progress so outer ones render on top
        const photos = photosRef.current;
        photos.sort((a, b) => a.progress - b.progress);

        for (let i = 0; i < photos.length; i++) {
          const p = photos[i];

          // Advance progress
          p.progress += effectiveSpeed * p.speedFactor * dt;
          if (p.progress > 1) p.progress -= 1;
          if (p.progress < 0) p.progress += 1;

          // Don't draw if inside blankArea
          if (p.progress < blankArea * 0.5) continue;

          // Perspective acceleration (rush)
          // When rush is high, distance accelerates faster near edges
          const rushPower = 1 + rush * 2.2;
          const distFactor = Math.pow(p.progress, rushPower);
          const currentDist = distFactor * maxDist;

          // Spiral curvature
          const currentAngle = p.angle + spiral * p.progress * Math.PI;

          // Position
          const px = cx + Math.cos(currentAngle) * currentDist;
          const py = cy + Math.sin(currentAngle) * currentDist;

          // Scaling
          const photoScale = Math.max(0.15, p.progress * 1.4) * p.sizeFactor;
          const photoW = size * photoScale;
          const photoH = (size / p.aspectRatio) * photoScale;

          // Fade in at blank area, fade out at edges
          let alpha = 1;
          if (p.progress < blankArea) {
            alpha = (p.progress - blankArea * 0.5) / (blankArea * 0.5);
          } else if (edgeFade && p.progress > 0.85) {
            alpha = (1 - p.progress) / 0.15;
          }
          alpha = Math.max(0, Math.min(1, alpha));

          if (alpha <= 0.01) continue;

          // Check if image is loaded
          const img = loadedImages[p.imageIndex];

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(p.rotation + currentAngle * 0.05);
          ctx.globalAlpha = alpha;

          // Drop shadow
          if (shadow) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
            ctx.shadowBlur = 12 * photoScale + 4;
            ctx.shadowOffsetY = 6 * photoScale + 2;
          }

          // Outer print border (traditional film print rim)
          const totalRim = (border + rim) * photoScale;
          const totalBorderW = photoW + totalRim * 2;
          const totalBorderH = photoH + totalRim * 2 + (rim * 0.8 * photoScale); // extra bottom rim like polaroid / darkroom proof

          ctx.fillStyle = borderColor;
          ctx.beginPath();
          const cr = radius * photoScale;
          ctx.roundRect(-totalBorderW / 2, -totalBorderH / 2, totalBorderW, totalBorderH, cr);
          ctx.fill();

          // Reset shadow for image
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;

          // Clip for photographic print content
          ctx.save();
          ctx.beginPath();
          const imgCornerRadius = Math.max(0, cr - 2);
          const imgYOffset = -(rim * 0.4 * photoScale);
          ctx.roundRect(-photoW / 2, -photoH / 2 + imgYOffset, photoW, photoH, imgCornerRadius);
          ctx.clip();

          if (img) {
            // Latent film development effect (develop prop)
            // As photos stream out, they transition from silver halide exposure to vivid high-contrast color
            if (develop) {
              const devProgress = Math.min(1, Math.max(0, (p.progress - blankArea) / (0.7 - blankArea)));
              // Draw developed image
              ctx.drawImage(img, -photoW / 2, -photoH / 2 + imgYOffset, photoW, photoH);

              // Latent darkroom exposure wash overlay if not fully developed
              if (devProgress < 0.98) {
                ctx.save();
                ctx.globalCompositeOperation = 'color';
                ctx.fillStyle = `rgba(180, 160, 140, ${1 - devProgress})`;
                ctx.fillRect(-photoW / 2, -photoH / 2 + imgYOffset, photoW, photoH);

                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = `rgba(220, 210, 190, ${(1 - devProgress) * 0.35})`;
                ctx.fillRect(-photoW / 2, -photoH / 2 + imgYOffset, photoW, photoH);
                ctx.restore();
              }
            } else {
              ctx.drawImage(img, -photoW / 2, -photoH / 2 + imgYOffset, photoW, photoH);
            }
          } else {
            ctx.fillStyle = '#1c1e24';
            ctx.fillRect(-photoW / 2, -photoH / 2 + imgYOffset, photoW, photoH);
          }

          // Subtle film grain / gloss highlight
          const glossGrad = ctx.createLinearGradient(-photoW / 2, -photoH / 2, photoW / 2, photoH / 2);
          glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
          glossGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
          glossGrad.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
          ctx.fillStyle = glossGrad;
          ctx.fillRect(-photoW / 2, -photoH / 2 + imgYOffset, photoW, photoH);

          ctx.restore(); // end clip

          // Film frame label / frame index at bottom rim
          if (photoScale > 0.45) {
            ctx.fillStyle = 'rgba(12, 12, 12, 0.45)';
            ctx.font = `600 ${Math.max(7, Math.floor(9 * photoScale))}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const frameIndex = ((p.imageIndex + 1).toString().padStart(2, '0'));
            ctx.fillText(
              `FRAME ${frameIndex}A`,
              0,
              totalBorderH / 2 - (rim * 0.5 * photoScale)
            );
          }

          ctx.restore();
        }

        ctx.restore();
        animationFrameRef.current = requestAnimationFrame(render);
      };

      animationFrameRef.current = requestAnimationFrame(render);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [
      loadedImages,
      speed,
      rush,
      spiral,
      blankArea,
      size,
      aspect,
      radius,
      border,
      borderColor,
      rim,
      develop,
      shadow,
      edgeFade,
      backgroundColor,
      paused,
      dpr,
    ]);

    // Handle canvas click to open photo
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = canvas.clientWidth / 2;
      const cy = canvas.clientHeight / 2;
      const clickDist = Math.hypot(x - cx, y - cy);

      // If clicked in center blank area, boost stream
      if (clickDist < (Math.hypot(canvas.clientWidth, canvas.clientHeight) / 2) * blankArea * 0.7) {
        boostVelocityRef.current += 0.2;
        return;
      }

      // Find nearest photo
      const maxDist = Math.hypot(canvas.clientWidth, canvas.clientHeight) / 2;
      let closestIdx = 0;
      let minDelta = Infinity;

      for (const p of photosRef.current) {
        if (p.progress < blankArea * 0.6 || p.progress > 0.95) continue;
        const currentDist = Math.pow(p.progress, 1 + rush * 2.2) * maxDist;
        const currentAngle = p.angle + spiral * p.progress * Math.PI;
        const px = cx + Math.cos(currentAngle) * currentDist;
        const py = cy + Math.sin(currentAngle) * currentDist;
        const d = Math.hypot(x - px, y - py);
        if (d < minDelta) {
          minDelta = d;
          closestIdx = p.imageIndex;
        }
      }

      if (minDelta < size * 1.5) {
        setSelectedIndex(closestIdx);
        onOpen?.(closestIdx);
      } else {
        boostVelocityRef.current += 0.15;
      }
    };

    return (
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden select-none ${className}`}
        style={{ ...style, backgroundColor }}
        onWheel={handleWheel}
        aria-label={ariaLabel}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-full block cursor-pointer touch-none"
        />

        {/* Center content container positioned in the blankArea */}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">{children}</div>
          </div>
        )}
      </div>
    );
  }
);

ContactSheet.displayName = 'ContactSheet';
