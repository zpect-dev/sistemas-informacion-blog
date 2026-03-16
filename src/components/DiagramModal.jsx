import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * DiagramModal — full-screen overlay with viewBox-based zoom (crisp SVG quality)
 * and body-scroll lock.
 *
 * Props:
 *   content  – raw SVG outerHTML string (null = hidden)
 *   onClose  – callback
 */
function DiagramModal({ content, onClose }) {
  const containerRef = useRef(null);
  const svgRef       = useRef(null);        // the actual <svg> element in the modal
  const vbInit       = useRef(null);        // original viewBox { x, y, w, h }
  const vbCur        = useRef(null);        // current   viewBox { x, y, w, h }
  const dragging     = useRef(false);
  const lastPx       = useRef({ x: 0, y: 0 }); // last mouse position in pixels

  // ── Lock / unlock body scroll ──────────────────────────────────────────────
  useEffect(() => {
    if (content) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [content]);

  // ── ESC to close ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!content) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [content, onClose]);

  // ── Initialise viewBox when content changes ────────────────────────────────
  useEffect(() => {
    if (!content) return;
    // Give the DOM a tick to render the injected SVG
    requestAnimationFrame(() => {
      const svg = containerRef.current?.querySelector('svg');
      if (!svg) return;
      svgRef.current = svg;

      // Ensure the SVG fills its container and keeps aspect ratio
      svg.setAttribute('width',  '100%');
      svg.setAttribute('height', '100%');
      svg.style.display = 'block';

      // If there's no viewBox, create one from its rendered size
      if (!svg.getAttribute('viewBox')) {
        const bb = svg.getBoundingClientRect();
        svg.setAttribute('viewBox', `0 0 ${bb.width} ${bb.height}`);
      }

      const vb = svg.viewBox.baseVal;
      const box = { x: vb.x, y: vb.y, w: vb.width, h: vb.height };
      vbInit.current = { ...box };
      vbCur.current  = { ...box };
    });
  }, [content]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const applyViewBox = () => {
    const { x, y, w, h } = vbCur.current;
    svgRef.current?.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
  };

  const zoom = useCallback((factor, cx, cy) => {
    if (!vbCur.current) return;
    const vb = vbCur.current;

    // Pivot around (cx, cy) which are SVG-coordinate ratios [0..1]
    const pivotX = vb.x + (cx ?? 0.5) * vb.w;
    const pivotY = vb.y + (cy ?? 0.5) * vb.h;

    const newW = Math.min(vbInit.current.w * 5, Math.max(vbInit.current.w * 0.1, vb.w * factor));
    const newH = Math.min(vbInit.current.h * 5, Math.max(vbInit.current.h * 0.1, vb.h * factor));

    vbCur.current = {
      x: pivotX - (pivotX - vb.x) * (newW / vb.w),
      y: pivotY - (pivotY - vb.y) * (newH / vb.h),
      w: newW,
      h: newH,
    };
    applyViewBox();
  }, []);

  const resetView = useCallback(() => {
    if (!vbInit.current) return;
    vbCur.current = { ...vbInit.current };
    applyViewBox();
  }, []);

  // ── Mouse-wheel zoom ───────────────────────────────────────────────────────
  const onWheel = (e) => {
    e.preventDefault();
    const rect   = e.currentTarget.getBoundingClientRect();
    const cx     = (e.clientX - rect.left) / rect.width;
    const cy     = (e.clientY - rect.top)  / rect.height;
    const factor = e.deltaY > 0 ? 1.12 : 0.893; // zoom out / in
    zoom(factor, cx, cy);
  };

  // ── Drag-to-pan ────────────────────────────────────────────────────────────
  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    dragging.current = true;
    lastPx.current   = { x: e.clientX, y: e.clientY };
    e.currentTarget.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!dragging.current || !vbCur.current) return;
    const rect   = e.currentTarget.getBoundingClientRect();
    const dx     = (e.clientX - lastPx.current.x) / rect.width  * vbCur.current.w;
    const dy     = (e.clientY - lastPx.current.y) / rect.height * vbCur.current.h;
    lastPx.current = { x: e.clientX, y: e.clientY };
    vbCur.current.x -= dx;
    vbCur.current.y -= dy;
    applyViewBox();
  };

  const stopDrag = (e) => {
    dragging.current = false;
    if (e.currentTarget) e.currentTarget.style.cursor = 'grab';
  };

  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Controls */}
      <div
        className="absolute top-4 right-4 z-10 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => zoom(0.8)}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-violet-700 hover:text-white transition-colors text-xl font-bold"
          title="Acercar"
        >+</button>
        <button
          onClick={() => zoom(1.25)}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-violet-700 hover:text-white transition-colors text-xl font-bold"
          title="Alejar"
        >−</button>
        <button
          onClick={resetView}
          className="flex h-9 px-3 items-center gap-1 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 hover:text-white transition-colors font-medium"
          title="Restablecer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H5.498a.75.75 0 00-.75.75v3.498a.75.75 0 001.5 0v-1.473l.313.315a7 7 0 0011.713-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V3.198a.75.75 0 00-1.5 0v1.474l-.313-.316a7 7 0 00-11.713 3.14.75.75 0 001.449.39A5.5 5.5 0 0114.7 4.6l.313.31h-2.432a.75.75 0 000 1.5h3.498a.75.75 0 00.53-.219z" clipRule="evenodd" />
          </svg>
          Reset
        </button>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-700 text-white hover:bg-violet-500 transition-colors text-base font-bold"
          title="Cerrar (ESC)"
        >✕</button>
      </div>

      {/* Hint text */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-500 pointer-events-none select-none">
        Rueda del ratón · Arrastra para mover · ESC para cerrar
      </p>

      {/* SVG canvas */}
      <div
        ref={containerRef}
        className="w-[90vw] h-[85vh] overflow-hidden select-none"
        style={{ cursor: 'grab' }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onClick={(e) => e.stopPropagation()}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default DiagramModal;
