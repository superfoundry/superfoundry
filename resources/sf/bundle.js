/* @ds-bundle: {"format":4,"namespace":"SuperintelligenceFoundryDesignSystem_07c936","components":[{"name":"Starfield","sourcePath":"components/brand/Starfield.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"NavLink","sourcePath":"components/navigation/NavLink.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/Starfield.jsx":"a1be96c75239","components/core/Badge.jsx":"e1e2f8d561f4","components/core/Button.jsx":"b97fc313228e","components/core/Card.jsx":"703d947fa9c2","components/core/IconButton.jsx":"b82bd3733a51","components/core/Tag.jsx":"14211cbdc661","components/feedback/Dialog.jsx":"0fa311bb4a97","components/feedback/Toast.jsx":"f1cfbf68f049","components/feedback/Tooltip.jsx":"8e65d1516453","components/forms/Checkbox.jsx":"20b9eb5d6193","components/forms/Input.jsx":"e67b7df2e770","components/forms/Radio.jsx":"8854594e71ca","components/forms/Select.jsx":"05eba5f3bc83","components/forms/Switch.jsx":"41abc1586efb","components/navigation/NavLink.jsx":"c83da45a032d","components/navigation/Tabs.jsx":"94d2d3f83dc5","ui_kits/marketing/Chapters.jsx":"c3334762ea3a","ui_kits/marketing/Curtain.jsx":"210c6c0f25d5","ui_kits/marketing/LoopDiagram.jsx":"161d5abc56e7","ui_kits/marketing/Shell.jsx":"43ff63e94956"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SuperintelligenceFoundryDesignSystem_07c936 = window.SuperintelligenceFoundryDesignSystem_07c936 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Starfield.jsx
try { (() => {
const {
  useRef,
  useEffect
} = React; // The site's starfield at rest: seeded glow-star tiles, three depth bands, twinkle +
// idle float. No scroll coupling, no forward dolly, no zoom-streaks.
function Starfield({
  density = 1,
  tone = 'light',
  background,
  drift = true,
  children
}) {
  const canvasRef = useRef(null);
  const dark = tone === 'dark';
  // dark: the original dark-site field — warm off-white stars on surface-inverse
  const ground = background ?? (dark ? 'var(--surface-inverse, #161311)' : 'var(--surface-app, #F3EFE8)');
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf,
      w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // seeded PRNG — same layout every load, same as the site
    let seed = 8675309;
    const rnd = () => (seed = seed * 1103515245 + 12345 & 0x7fffffff) / 0x7fffffff;
    const W = 1600,
      H = 1200;
    const dens = Math.max(0.1, density);
    // [count, radius range, alpha range] per depth band — the site's specs
    const specs = [[Math.round(182 * dens), [0.7, 1.3], [0.28, 0.5]], [Math.round(91 * dens), [1.1, 1.9], [0.4, 0.7]], [Math.round(42 * dens), [1.7, 2.8], [0.6, 0.95]]];
    // each band split into sub-tiles that twinkle on their own period/phase
    const tiles = specs.map(([count, size, alpha]) => {
      const subs = [];
      for (let sub = 0; sub < 2; sub++) {
        const m = {
          per: 4.5 + rnd() * 5,
          ph: rnd() * 6.283,
          amp: 0.12 + rnd() * 0.2,
          pat: null
        };
        const cv = document.createElement('canvas');
        cv.width = W;
        cv.height = H;
        const g = cv.getContext('2d');
        for (let i = 0; i < Math.round(count / 2); i++) {
          const x = rnd() * W,
            y = rnd() * H;
          const r = size[0] + rnd() * (size[1] - size[0]);
          const a = alpha[0] + rnd() * (alpha[1] - alpha[0]);
          const hue = rnd();
          const col = dark
            ? (hue > 0.80 ? (rnd() < 0.5 ? '91,143,219' : '138,176,232') : hue > 0.60 ? (rnd() < 0.5 ? '242,137,79' : '247,168,118') : hue > 0.48 ? (rnd() < 0.5 ? '155,179,101' : '185,204,141') : '245,243,238')
            : (hue > 0.80 ? (rnd() < 0.5 ? '47,111,204' : '36,86,160') : hue > 0.60 ? (rnd() < 0.5 ? '232,112,58' : '194,79,26') : hue > 0.48 ? (rnd() < 0.5 ? '122,148,72' : '86,107,54') : '60,54,48');
          // on paper the accent stars carry the colour: brighter than the ink ones
          const aa = (!dark && col !== '60,54,48') ? Math.min(1, a * 1.35) : a;
          // wrap-drawn in all nine positions so the repeating tile has no seam
          const R = r * 2.2;
          for (const ox of [-W, 0, W]) for (const oy of [-H, 0, H]) {
            const cx = x + ox,
              cy = y + oy;
            if (cx < -R || cx > W + R || cy < -R || cy > H + R) continue;
            const grad = g.createRadialGradient(cx, cy, 0, cx, cy, R);
            grad.addColorStop(0, 'rgba(' + col + ',' + aa.toFixed(3) + ')');
            grad.addColorStop(0.45, 'rgba(' + col + ',' + (aa * 0.45).toFixed(3) + ')');
            grad.addColorStop(1, 'rgba(' + col + ',0)');
            g.fillStyle = grad;
            g.beginPath();
            g.arc(cx, cy, R, 0, 6.2832);
            g.fill();
          }
        }
        m.cv = cv;
        subs.push(m);
      }
      return subs;
    });
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      tiles.forEach(subs => subs.forEach(m => {
        m.pat = ctx.createPattern(m.cv, 'repeat');
      }));
    };
    let last = 0;
    const draw = t => {
      // idle throttle: float + twinkle is visually identical at 30fps
      if (t - last < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = t;
      const ft = t / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      tiles.forEach((subs, li) => {
        // idle float: near bands swing further, all on one shared rhythm
        const amp = drift ? 5 + li * li * 11 : 0;
        const fx = Math.sin(ft * 0.11) * amp;
        const fy = Math.sin(ft * 0.079 + 1.1) * amp * 0.72;
        for (const m of subs) {
          const tw = 1 - m.amp + m.amp * Math.sin(ft * (6.283 / m.per) + m.ph);
          if (tw <= 0.003 || !m.pat) continue;
          ctx.save();
          ctx.translate(fx, fy);
          ctx.globalAlpha = Math.min(1, tw);
          ctx.fillStyle = m.pat;
          ctx.fillRect(-fx, -fy, w, h);
          ctx.restore();
        }
      });
      raf = requestAnimationFrame(draw);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, drift, tone]);
  return React.createElement('div', {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      background: ground,
      overflow: 'hidden'
    }
  }, React.createElement('canvas', {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'block'
    }
  }), children != null && React.createElement('div', {
    style: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      height: '100%'
    }
  }, children));
}
Object.assign(__ds_scope, { Starfield });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Starfield.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const toneColors = {
  neutral: {
    bg: 'var(--surface-raised)',
    fg: 'var(--text-secondary)',
    border: 'var(--border-default)'
  },
  accent: {
    bg: 'var(--accent-muted)',
    fg: 'var(--text-accent)',
    border: 'transparent'
  },
  ai: {
    bg: 'var(--accent-ai-muted)',
    fg: 'var(--text-ai)',
    border: 'transparent'
  },
  olive: {
    bg: 'var(--accent-olive-muted)',
    fg: 'var(--text-olive)',
    border: 'transparent'
  },
  success: {
    bg: 'var(--accent-success-muted)',
    fg: 'var(--text-success)',
    border: 'transparent'
  },
  warning: {
    bg: 'var(--accent-warning-muted)',
    fg: 'var(--text-warning)',
    border: 'transparent'
  },
  error: {
    bg: 'var(--accent-error-muted)',
    fg: 'var(--text-error)',
    border: 'transparent'
  }
};
function Badge({
  children,
  tone = 'neutral'
}) {
  const c = toneColors[tone] || toneColors.neutral;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 9px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--text-caption)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      fontSize: '11px',
      background: c.bg,
      color: c.fg,
      border: `1px solid ${c.border}`,
      whiteSpace: 'nowrap'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizeStyles = {
  sm: {
    padding: '6px 12px',
    font: 'var(--text-label)'
  },
  md: {
    padding: '10px 18px',
    font: 'var(--text-body-s)'
  },
  lg: {
    padding: '13px 24px',
    font: 'var(--text-body-m)'
  }
};
function variantStyle(variant) {
  switch (variant) {
    case 'secondary':
      return {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-strong)'
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid transparent'
      };
    case 'destructive':
      return {
        background: 'var(--sf-signal-error)',
        color: 'var(--sf-white)',
        border: '1px solid transparent'
      };
    case 'primary':
    default:
      return {
        background: 'var(--accent-default)',
        color: 'var(--text-on-accent)',
        border: '1px solid transparent'
      };
  }
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  onClick,
  type = 'button'
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const base = variantStyle(variant);
  let background = base.background;
  if (!disabled && hover) {
    if (variant === 'primary') background = 'var(--accent-hover)';
    if (variant === 'secondary' || variant === 'ghost') background = 'var(--surface-raised)';
    if (variant === 'destructive') background = 'var(--sf-signal-error)';
  }
  if (!disabled && active) {
    if (variant === 'primary') background = 'var(--accent-active)';
  }
  return React.createElement('button', {
    type,
    disabled,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-body)',
      font: sizeStyles[size].font,
      fontWeight: 600,
      letterSpacing: 'var(--tracking-normal)',
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: `transform var(--duration-fast) var(--ease-press), background var(--duration-base) var(--ease-standard)`,
      transform: !disabled && active ? 'scale(0.97)' : 'scale(1)',
      opacity: disabled ? 0.4 : 1,
      padding: sizeStyles[size].padding,
      ...base,
      background
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  interactive = false,
  padding = 'lg',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const pad = padding === 'sm' ? '16px' : padding === 'md' ? '20px' : '28px';
  return React.createElement('div', {
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: `1px solid ${interactive && hover ? 'var(--border-strong)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      padding: pad,
      boxShadow: interactive && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: interactive && hover ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'all var(--duration-base) var(--ease-standard)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'ghost',
  onClick,
  disabled = false
}) {
  const [hover, setHover] = React.useState(false);
  const dim = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  const isSolid = variant === 'solid';
  return React.createElement('button', {
    type: 'button',
    onClick,
    disabled,
    'aria-label': label,
    title: label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dim,
      height: dim,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      border: isSolid ? '1px solid transparent' : '1px solid var(--border-default)',
      background: isSolid ? hover ? 'var(--accent-hover)' : 'var(--accent-default)' : hover ? 'var(--surface-raised)' : 'transparent',
      color: isSolid ? 'var(--text-on-accent)' : 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background var(--duration-base) var(--ease-standard)'
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove
}) {
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 8px 4px 10px',
      borderRadius: 'var(--radius-sm)',
      font: 'var(--text-caption)',
      color: 'var(--text-secondary)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)'
    }
  }, children, onRemove && React.createElement('button', {
    type: 'button',
    onClick: onRemove,
    'aria-label': 'Remove',
    style: {
      all: 'unset',
      cursor: 'pointer',
      color: 'var(--text-tertiary)',
      fontFamily: 'var(--font-mono)',
      lineHeight: 1,
      padding: '2px'
    }
  }, '\u00D7'));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  actions
}) {
  if (!open) return null;
  return React.createElement('div', {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--surface-overlay)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    },
    onClick: onClose
  }, React.createElement('div', {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      padding: '24px',
      width: 380,
      maxWidth: '90vw',
      fontFamily: 'var(--font-body)'
    }
  }, title && React.createElement('div', {
    style: {
      font: 'var(--text-heading-m)',
      color: 'var(--text-primary)',
      marginBottom: 12
    }
  }, title), React.createElement('div', {
    style: {
      font: 'var(--text-body-s)',
      color: 'var(--text-secondary)',
      marginBottom: 20
    }
  }, children), actions && React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end'
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const toneAccent = {
  info: 'var(--sf-ember-500)',
  success: 'var(--sf-signal-success)',
  warning: 'var(--sf-signal-warning)',
  error: 'var(--sf-signal-error)'
};
function Toast({
  children,
  tone = 'info',
  onDismiss
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      padding: '12px 14px',
      background: 'var(--surface-inverse)',
      border: '1px solid var(--border-default)',
      borderLeft: `2px solid ${toneAccent[tone] || toneAccent.info}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      maxWidth: 340,
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('span', {
    style: {
      font: 'var(--text-body-s)',
      color: 'var(--text-inverse)',
      flex: 1
    }
  }, children), onDismiss && React.createElement('button', {
    onClick: onDismiss,
    'aria-label': 'Dismiss',
    style: {
      all: 'unset',
      cursor: 'pointer',
      color: 'var(--text-inverse)',
      opacity: 0.55,
      fontFamily: 'var(--font-mono)',
      lineHeight: 1
    }
  }, '\u00D7'));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  content,
  side = 'top'
}) {
  const [show, setShow] = React.useState(false);
  const posStyle = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 8
    }
  }[side];
  return React.createElement('span', {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && React.createElement('span', {
    style: {
      position: 'absolute',
      ...posStyle,
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      font: 'var(--text-caption)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      zIndex: 20
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('input', {
    type: 'checkbox',
    checked,
    onChange,
    disabled,
    style: {
      display: 'none'
    }
  }), React.createElement('span', {
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${checked ? 'var(--accent-default)' : 'var(--border-strong)'}`,
      background: checked ? 'var(--accent-default)' : 'transparent',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-on-accent)',
      fontSize: 12,
      transition: 'all var(--duration-fast) var(--ease-press)',
      flexShrink: 0
    }
  }, checked ? '\u2713' : ''), label && React.createElement('span', {
    style: {
      font: 'var(--text-body-s)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  disabled = false
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('span', {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-secondary)'
    }
  }, label), React.createElement('input', {
    type,
    value,
    placeholder,
    disabled,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      font: 'var(--text-body-s)',
      color: 'var(--text-primary)',
      background: 'var(--surface-raised)',
      border: `1px solid ${error ? 'var(--sf-signal-error)' : focus ? 'var(--border-accent)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '10px 12px',
      outline: 'none',
      boxShadow: focus && !error ? 'var(--shadow-focus-ring)' : 'none',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)'
    }
  }), error && React.createElement('span', {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--sf-signal-error)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  name,
  disabled = false
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('input', {
    type: 'radio',
    checked,
    onChange,
    name,
    disabled,
    style: {
      display: 'none'
    }
  }), React.createElement('span', {
    style: {
      width: 18,
      height: 18,
      boxSizing: 'border-box',
      borderRadius: '50%',
      border: `1px solid ${checked ? 'var(--accent-default)' : 'var(--border-strong)'}`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'border-color var(--duration-fast) var(--ease-press)'
    }
  }, checked && React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--accent-default)'
    }
  })), label && React.createElement('span', {
    style: {
      font: 'var(--text-body-s)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  disabled = false
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('span', {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-secondary)'
    }
  }, label), React.createElement('select', {
    value,
    onChange,
    disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      font: 'var(--text-body-s)',
      color: 'var(--text-primary)',
      background: 'var(--surface-raised)',
      border: `1px solid ${focus ? 'var(--border-accent)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '10px 12px',
      outline: 'none',
      opacity: disabled ? 0.5 : 1
    }
  }, options.map(opt => React.createElement('option', {
    key: opt.value,
    value: opt.value
  }, opt.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label,
  disabled = false
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('input', {
    type: 'checkbox',
    checked,
    onChange,
    disabled,
    style: {
      display: 'none'
    }
  }), React.createElement('span', {
    style: {
      width: 36,
      height: 20,
      boxSizing: 'border-box',
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--accent-default)' : 'var(--surface-raised)',
      border: `1px solid ${checked ? 'var(--accent-default)' : 'var(--border-strong)'}`,
      position: 'relative',
      transition: 'background var(--duration-base) var(--ease-standard)',
      flexShrink: 0
    }
  }, React.createElement('span', {
    style: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: checked ? 19 : 1,
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: checked ? 'var(--text-on-accent)' : 'var(--sf-char-300)',
      transition: 'left var(--duration-base) var(--ease-standard)'
    }
  })), label && React.createElement('span', {
    style: {
      font: 'var(--text-body-s)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavLink.jsx
try { (() => {
function NavLink({
  children,
  active = false,
  href = '#',
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('a', {
    href,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      font: 'var(--text-body-s)',
      fontWeight: 500,
      textDecoration: 'none',
      color: active || hover ? 'var(--text-primary)' : 'var(--text-secondary)',
      transition: 'color var(--duration-fast) var(--ease-standard)'
    }
  }, children);
}
Object.assign(__ds_scope, { NavLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavLink.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs,
  value,
  onChange
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: '4px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, tabs.map(tab => {
    const active = tab.value === value;
    return React.createElement('button', {
      key: tab.value,
      type: 'button',
      onClick: () => onChange && onChange(tab.value),
      style: {
        all: 'unset',
        cursor: 'pointer',
        padding: '10px 4px',
        marginRight: '20px',
        font: 'var(--text-body-s)',
        fontWeight: 600,
        color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
        borderBottom: `2px solid ${active ? 'var(--accent-default)' : 'transparent'}`,
        transition: 'color var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard)'
      }
    }, tab.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Chapters.jsx
try { (() => {
// The four chapters of superfoundry.dev. Copy is verbatim from the live site.

function FoundryChapter() {
  return /*#__PURE__*/React.createElement(Chapter, {
    maxWidth: 940
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The Foundry"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--font-size-display-m)',
      fontWeight: 'var(--font-weight-display-m)',
      lineHeight: 'var(--line-height-display-m)',
      letterSpacing: 'var(--tracking-tight)',
      margin: 0,
      color: 'var(--sf-ink-900)',
      maxWidth: '32ch',
      textWrap: 'balance'
    }
  }, "The next frontier of AI is the physical world. We extend foundation models downward into reality; an artificial general scientist, engineer, and inventor that learns through interaction."));
}
function MissionChapter() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'absolute',
      inset: 0,
      padding: '0 var(--page-margin) 110px calc(var(--page-margin) * 2)',
      display: 'flex',
      alignItems: 'stretch',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 300,
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingBottom: '6vh',
      gap: 18,
      alignItems: 'flex-start',
      textShadow: '0 0 3px var(--sf-paper-400), 0 0 6px var(--sf-paper-400), 1px 1px 0 var(--sf-paper-400), -1px 1px 0 var(--sf-paper-400), 1px -1px 0 var(--sf-paper-400), -1px -1px 0 var(--sf-paper-400)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: -22,
      top: 0,
      bottom: '6vh',
      width: 2,
      background: 'var(--border-default)'
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, null, "Our mission"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--text-display-s)',
      color: 'var(--text-primary)',
      letterSpacing: 'var(--tracking-tight)',
      margin: 0,
      textWrap: 'balance'
    }
  }, "Every solution paves the way for solving what comes next."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      font: '400 1rem/1.5 var(--font-body)',
      color: 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, /*#__PURE__*/React.createElement("span", null, "We build self-improving world models."), /*#__PURE__*/React.createElement("span", null, "The LLM already holds a vast ontology of the world and externalizes it by writing programs, because a program is a model."), /*#__PURE__*/React.createElement("span", null, "It writes an executable model of a domain, proposes minimal experiments to resolve what's uncertain, and tests its predictions against reality."))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(LoopDiagram, null)));
}
const sfFounders = [{
  name: 'Jad Tarifi',
  role: 'CEO',
  photo: '../../assets/imagery/founder-jad.webp',
  bio: 'Previous Tech Lead & Manager at Google AI, YouTube, Amazon, & CapitalOne. PhD in foundations of AGI.',
  logos: [{
    src: '../../assets/logos/googleai-dark.svg',
    alt: 'Google AI',
    h: 20
  }, {
    src: '../../assets/logos/youtube-dark.svg',
    alt: 'YouTube',
    h: 18
  }, {
    src: '../../assets/logos/amazon-dark.svg',
    alt: 'Amazon',
    h: 20
  }]
}, {
  name: 'Nima Asgharbeygi',
  role: 'CTO',
  photo: '../../assets/imagery/founder-nima.webp',
  bio: 'Previous Area Tech Lead for on-device AI at Google Maps. Co-founder & CTO of CleverSense (acquired by Google in 2011).',
  logos: [{
    src: '../../assets/logos/google.svg',
    alt: 'Google',
    h: 20
  }, {
    src: '../../assets/logos/cleversense.png',
    alt: 'CleverSense',
    h: 26
  }, {
    src: '../../assets/logos/stanford.png',
    alt: 'Stanford University',
    h: 18,
    pill: true
  }]
}];
function FoundersChapter() {
  return /*#__PURE__*/React.createElement(Chapter, {
    maxWidth: 900
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "About the co-founders"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
      gap: 64
    }
  }, sfFounders.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      height: 160,
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: f.photo,
    alt: f.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-display-s)',
      color: 'var(--text-primary)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, f.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-mono-s)',
      color: 'var(--text-accent)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, f.role)), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--text-body-m)',
      color: 'var(--text-secondary)',
      margin: 0,
      textWrap: 'pretty'
    }
  }, f.bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      flexWrap: 'wrap',
      marginTop: 4
    }
  }, f.logos.map(l => l.pill ? /*#__PURE__*/React.createElement("span", {
    key: l.alt,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'var(--sf-paper-500)',
      borderRadius: 'var(--radius-pill)',
      padding: '5px 12px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.src,
    alt: l.alt,
    style: {
      height: l.h,
      width: 'auto'
    }
  })) : /*#__PURE__*/React.createElement("img", {
    key: l.alt,
    src: l.src,
    alt: l.alt,
    style: {
      height: l.h,
      width: 'auto'
    }
  })))))));
}
function ContactChapter() {
  return /*#__PURE__*/React.createElement(Chapter, {
    maxWidth: 820
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Contact"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--font-size-display-m)',
      fontWeight: 'var(--font-weight-display-m)',
      lineHeight: 'var(--line-height-display-m)',
      letterSpacing: 'var(--tracking-tight)',
      margin: 0
    }
  }, "Work with the foundry."), /*#__PURE__*/React.createElement("a", {
    href: "mailto:jad@superfoundry.dev",
    style: {
      font: 'var(--text-body-l)',
      color: 'var(--text-accent)',
      width: 'max-content'
    }
  }, "jad@superfoundry.dev"));
}
Object.assign(window, {
  FoundryChapter,
  MissionChapter,
  FoundersChapter,
  ContactChapter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Chapters.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Curtain.jsx
try { (() => {
// Intro curtain: a paper sheet with the diagonal hatch texture, the mark, and the
// two-line headline. Clicking anywhere enters the site.
function Curtain({
  onEnter
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onEnter,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 40,
      background: 'var(--sf-paper-100)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '11vh var(--page-margin) 0 calc(var(--page-margin) * 2)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'none'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "sfHatchTile",
    width: "6",
    height: "6",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 -3 L-3 9",
    stroke: "var(--sf-ink-300)",
    strokeOpacity: "0.2",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "url(#sfHatchTile)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 'max-content',
      maxWidth: '100%',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/aleph-mark-light.svg",
    alt: "Superintelligence Foundry",
    style: {
      height: 44,
      width: 'auto',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--font-weight-display-l)',
      lineHeight: 1.02,
      letterSpacing: 'var(--tracking-tight)',
      margin: 0,
      color: 'var(--sf-ink-900)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'calc(var(--font-size-display-l) * 0.58)'
    }
  }, "From Generative AI to"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--font-size-display-l)'
    }
  }, "Creative AGI"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 34,
      zIndex: 2,
      textAlign: 'center',
      font: 'var(--text-mono-s)',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--text-tertiary)'
    }
  }, "click to enter"));
}
Object.assign(window, {
  Curtain
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Curtain.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/LoopDiagram.jsx
try { (() => {
// The mission loop: three gradient arcs turning between three numbered stages,
// wrapped around the world-model globe. Static recreation of the site's animated
// diagram — same geometry, same segment colours.
const sfLoopNodes = [{
  n: '01',
  label: 'MODEL',
  desc: 'Writes an executable model',
  color: 'var(--text-accent)',
  top: '12.5%',
  left: '50%'
}, {
  n: '02',
  label: 'EXPLORE',
  desc: "Probes what's uncertain",
  color: 'var(--text-olive)',
  top: '68.75%',
  left: '82.475%'
}, {
  n: '03',
  label: 'UPDATE',
  desc: 'Tests against reality, feeds back',
  color: 'var(--text-ai)',
  top: '68.75%',
  left: '17.525%'
}];
function LoopDiagram() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 'min(calc(100vh - 230px), 900px)',
      maxWidth: '100%',
      aspectRatio: '1/1',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      border: '1px dashed var(--border-default)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 26,
      borderRadius: '50%',
      border: '1px solid var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 400",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "sfSegA",
    gradientUnits: "userSpaceOnUse",
    x1: "200",
    y1: "50",
    x2: "329.9",
    y2: "275"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#E8703A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.97",
    stopColor: "#E8703A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#7A9448"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "sfSegB",
    gradientUnits: "userSpaceOnUse",
    x1: "329.9",
    y1: "275",
    x2: "70.1",
    y2: "275"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#7A9448"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.97",
    stopColor: "#7A9448"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#5B8FDB"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "sfSegC",
    gradientUnits: "userSpaceOnUse",
    x1: "70.1",
    y1: "275",
    x2: "200",
    y2: "50"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#5B8FDB"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.97",
    stopColor: "#5B8FDB"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#E8703A"
  })), /*#__PURE__*/React.createElement("mask", {
    id: "sfArcMask"
  }, /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M266.7,65.6 A150,150 0 0 1 349.18,184.32"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M283.0,324.9 A150,150 0 0 1 139.0,337.0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50.3,209.4 A150,150 0 0 1 111.83,78.65"
  }), /*#__PURE__*/React.createElement("g", {
    fill: "#fff",
    stroke: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M350.3,194.8 L343.2,184.9 L355.2,183.7 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M129.4,332.7 L141.4,331.5 L136.6,342.5 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M120.3,72.5 L115.4,83.5 L108.3,73.8 Z"
  }))))), /*#__PURE__*/React.createElement("g", {
    mask: "url(#sfArcMask)",
    fill: "none",
    strokeWidth: "18"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M200,50 A150,150 0 0 1 329.9,275",
    stroke: "url(#sfSegA)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M329.9,275 A150,150 0 0 1 70.1,275",
    stroke: "url(#sfSegB)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M70.1,275 A150,150 0 0 1 200,50",
    stroke: "url(#sfSegC)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '46%',
      height: '46%',
      transform: 'translate(-50%,-50%) rotate(14deg)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 120",
    style: {
      width: '100%',
      height: '100%',
      display: 'block',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "sfGlobeClip"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "55"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "55",
    fill: "rgba(147,180,222,0.34)"
  }), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#sfGlobeClip)",
    fill: "none",
    stroke: "rgba(110,159,232,0.55)",
    strokeWidth: "0.4"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "60",
    x2: "118",
    y2: "60"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12,32 Q60,44 108,32"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22,16 Q60,26 98,16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12,88 Q60,76 108,88"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22,104 Q60,94 98,104"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60,4 A28,56 0 0 0 60,116"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60,4 A28,56 0 0 1 60,116"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60,4 A54,56 0 0 1 60,116"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "56",
    fill: "none",
    stroke: "var(--sf-ember-500)",
    strokeWidth: "1.6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 0.9375rem/1.4 var(--font-mono)',
      color: 'var(--sf-ink-900)',
      letterSpacing: 'var(--tracking-wide)',
      textAlign: 'center'
    }
  }, "WORLD", /*#__PURE__*/React.createElement("br", null), "MODEL")), sfLoopNodes.map(nd => /*#__PURE__*/React.createElement("div", {
    key: nd.n,
    style: {
      position: 'absolute',
      top: nd.top,
      left: nd.left,
      transform: 'translate(-50%,-50%)',
      width: 124,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--text-display-s)',
      color: nd.color
    }
  }, nd.n), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 0.875rem/1.4 var(--font-mono)',
      color: 'var(--sf-ink-900)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, nd.label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-s)',
      color: 'var(--sf-ink-900)',
      textAlign: 'center'
    }
  }, nd.desc))));
}
Object.assign(window, {
  LoopDiagram
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/LoopDiagram.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Shell.jsx
try { (() => {
// Bottom-centred chapter nav — lowercase mono labels, ember dot separators.
const sfNavIds = ['foundry', 'mission', 'founders', 'contact'];
function BottomNav({
  active,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 26,
      padding: '0 var(--page-margin) 34px'
    }
  }, sfNavIds.map((id, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: id
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: 'var(--sf-ember-500)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    onClick: () => onNavigate(id),
    style: {
      cursor: 'pointer',
      font: 'var(--text-mono-s)',
      letterSpacing: 'var(--tracking-wide)',
      color: active === id ? 'var(--text-primary)' : 'var(--text-tertiary)',
      transition: 'color 200ms cubic-bezier(0.2,0,0,1)'
    }
  }, id))));
}

// Every chapter shares one frame: doubled page margin on the left, a 2px margin
// rule beside the content, vertically centred in the viewport.
function Chapter({
  children,
  maxWidth = 940,
  align = 'center'
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'absolute',
      inset: 0,
      padding: '12vh var(--page-margin) 110px calc(var(--page-margin) * 2)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: align,
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth,
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: -22,
      top: 0,
      bottom: 0,
      width: 2,
      background: 'var(--border-default)'
    }
  }), children));
}
function Eyebrow({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-olive)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase'
    }
  }, children);
}
Object.assign(window, {
  BottomNav,
  Chapter,
  Eyebrow,
  sfNavIds
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Starfield = __ds_scope.Starfield;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.NavLink = __ds_scope.NavLink;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
