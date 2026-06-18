/* @ds-bundle: {"format":3,"namespace":"WemulDesignSystem_f56d87","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"CaseCard","sourcePath":"components/cards/CaseCard.jsx"},{"name":"MetricBlock","sourcePath":"components/cards/MetricBlock.jsx"},{"name":"ServiceCard","sourcePath":"components/cards/ServiceCard.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Tabs","sourcePath":"components/feedback/Tabs.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Badge","sourcePath":"components/pills/Badge.jsx"},{"name":"Pill","sourcePath":"components/pills/Pill.jsx"},{"name":"Tag","sourcePath":"components/pills/Tag.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"ab61f5df7678","components/buttons/IconButton.jsx":"144e77f5eac6","components/cards/Card.jsx":"62a6a9915cd8","components/cards/CaseCard.jsx":"b601bd9de698","components/cards/MetricBlock.jsx":"0d0e6b5af445","components/cards/ServiceCard.jsx":"68951ebd4a67","components/feedback/Accordion.jsx":"43050571d4a8","components/feedback/Tabs.jsx":"26b2afda325c","components/forms/Checkbox.jsx":"89d06353d8f6","components/forms/Input.jsx":"5b2da2a8f389","components/forms/Select.jsx":"2597a1af1cff","components/forms/Textarea.jsx":"2f9fe24acb95","components/pills/Badge.jsx":"2502a5e402d0","components/pills/Pill.jsx":"b3b99c1a3343","components/pills/Tag.jsx":"212c808c1796","ui_kits/website/CTA.jsx":"24efe512d6d4","ui_kits/website/Experience.jsx":"776925545c41","ui_kits/website/Footer.jsx":"ef7180cca25c","ui_kits/website/Header.jsx":"f9f7d2b1086f","ui_kits/website/Hero.jsx":"920e4c9d2e9c","ui_kits/website/Manifesto.jsx":"0b92db91c8d9","ui_kits/website/Metrics.jsx":"8c96cb8866c5","ui_kits/website/OwnNetworks.jsx":"c8c0473f0550","ui_kits/website/Portfolio.jsx":"1caf3bc805a1","ui_kits/website/Services.jsx":"70f0eda64b9f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WemulDesignSystem_f56d87 = window.WemulDesignSystem_f56d87 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul primary action. Coral = energy/CTA, blue = digital action,
 * navy = strategic/secondary-strong, ghost/outline for low emphasis.
 */
function Button({
  children,
  variant = 'coral',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: '0.875rem',
      padding: '0.5rem 1rem',
      gap: '0.4rem'
    },
    md: {
      fontSize: '1rem',
      padding: '0.75rem 1.5rem',
      gap: '0.5rem'
    },
    lg: {
      fontSize: '1.125rem',
      padding: '1rem 2rem',
      gap: '0.6rem'
    }
  };
  const variants = {
    coral: {
      background: 'var(--coral-500)',
      color: '#fff',
      border: '2px solid transparent',
      boxShadow: 'var(--shadow-coral)'
    },
    blue: {
      background: 'var(--blue-500)',
      color: '#fff',
      border: '2px solid transparent',
      boxShadow: 'var(--shadow-blue)'
    },
    navy: {
      background: 'var(--navy-500)',
      color: '#fff',
      border: '2px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--navy-500)',
      border: '2px solid var(--navy-500)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--blue-600)',
      border: '2px solid transparent'
    },
    white: {
      background: '#fff',
      color: 'var(--navy-500)',
      border: '2px solid transparent',
      boxShadow: 'var(--shadow-sm)'
    }
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverBg = {
    coral: 'var(--coral-600)',
    blue: 'var(--blue-600)',
    navy: 'var(--navy-600)',
    outline: 'var(--navy-500)',
    ghost: 'var(--blue-50)',
    white: '#fff'
  };
  const hoverColor = {
    outline: '#fff'
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.005em',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    width: fullWidth ? '100%' : 'auto',
    whiteSpace: 'nowrap',
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    transform: press ? 'scale(0.97)' : hover && !disabled ? 'translateY(-1px)' : 'none',
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? {
      background: hoverBg[variant],
      color: hoverColor[variant] || variants[variant].color
    } : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul icon-only button — circular, for toolbars, social links, nav.
 * Pass an icon node (e.g. a Lucide <i data-lucide> or SVG) as children.
 */
function IconButton({
  children,
  variant = 'outline',
  size = 'md',
  label,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 36,
    md: 44,
    lg: 52
  };
  const d = dims[size] || 44;
  const variants = {
    coral: {
      background: 'var(--coral-500)',
      color: '#fff',
      border: '2px solid transparent'
    },
    blue: {
      background: 'var(--blue-500)',
      color: '#fff',
      border: '2px solid transparent'
    },
    navy: {
      background: 'var(--navy-500)',
      color: '#fff',
      border: '2px solid transparent'
    },
    outline: {
      background: '#fff',
      color: 'var(--navy-500)',
      border: '1.5px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--navy-500)',
      border: '2px solid transparent'
    }
  };
  const hoverBg = {
    coral: 'var(--coral-600)',
    blue: 'var(--blue-600)',
    navy: 'var(--navy-600)',
    outline: 'var(--ink-50)',
    ghost: 'var(--ink-50)'
  };
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: d,
      height: d,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      transform: hover && !disabled ? 'translateY(-1px)' : 'none',
      ...variants[variant],
      ...(hover && !disabled ? {
        background: hoverBg[variant]
      } : {}),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul base surface card — white, 22px radius, cool navy-tinted shadow.
 * Lifts on hover when `interactive`. Use as the container for content
 * blocks, portfolio items and service modules.
 */
function Card({
  children,
  padding = 'var(--space-6)',
  interactive = false,
  accent = null,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const accentBar = accent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: 6,
      background: accent === 'coral' ? 'var(--coral-500)' : accent === 'blue' ? 'var(--blue-500)' : 'var(--navy-500)',
      borderTopLeftRadius: 'var(--radius-lg)',
      borderBottomLeftRadius: 'var(--radius-lg)'
    }
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      padding,
      boxShadow: interactive && hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
      transform: interactive && hover ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), accentBar, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/CaseCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul case-study / portfolio card — full-bleed media on top, a small
 * brand seal, client + project title, and optional metric. Rounded
 * corners, image zooms slightly on hover.
 */
function CaseCard({
  image,
  client,
  title,
  seal,
  metric,
  color = 'coral',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const bg = {
    coral: 'var(--coral-500)',
    blue: 'var(--blue-500)',
    navy: 'var(--navy-500)'
  }[color];
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 188,
      overflow: 'hidden',
      background: 'var(--ink-100)'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(1.06)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: bg
    }
  }), seal && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: '#fff',
      background: bg,
      padding: '0.3rem 0.75rem',
      borderRadius: 'var(--radius-pill)'
    }
  }, seal)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--text-muted)',
      marginBottom: 4
    }
  }, client), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.25rem',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
      color: 'var(--navy-500)'
    }
  }, title), metric && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: '1.5rem',
      color: bg,
      letterSpacing: '-0.015em'
    }
  }, metric)));
}
Object.assign(__ds_scope, { CaseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CaseCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/MetricBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul metric block — a big Gabarito number with a label. Powers the
 * "+12M seguidores / +1000M vistas" results module. Optional trend.
 */
function MetricBlock({
  value,
  label,
  color = 'coral',
  align = 'left',
  trend = null,
  style = {},
  ...rest
}) {
  const c = {
    coral: 'var(--coral-500)',
    blue: 'var(--blue-500)',
    navy: 'var(--navy-500)',
    white: '#fff'
  }[color];
  const labelColor = color === 'white' ? 'rgba(255,255,255,0.78)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.4rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(2.25rem, 5vw, 3rem)',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: c
    }
  }, value), trend && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: '0.875rem',
      color: 'var(--success)'
    }
  }, trend)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 500,
      fontSize: '0.9375rem',
      color: labelColor,
      lineHeight: 1.4,
      maxWidth: '20ch'
    }
  }, label));
}
Object.assign(__ds_scope, { MetricBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/MetricBlock.jsx", error: String((e && e.message) || e) }); }

// components/cards/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul service module — icon, title, description. Used in the
 * "Qué hacemos" grid (Creamos / Amplificamos / Administramos …).
 * Hover fills with the chosen color and inverts text.
 */
function ServiceCard({
  icon = null,
  title,
  children,
  color = 'blue',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const fill = {
    blue: 'var(--blue-500)',
    coral: 'var(--coral-500)',
    navy: 'var(--navy-500)'
  }[color];
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: hover ? fill : '#fff',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      padding: 'var(--space-6)',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-4px)' : 'none',
      transition: 'all var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-md)',
      marginBottom: 'var(--space-5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      background: hover ? 'rgba(255,255,255,0.18)' : 'var(--blue-50)',
      color: hover ? '#fff' : fill,
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 0.5rem',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.375rem',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
      color: hover ? '#fff' : 'var(--navy-500)',
      transition: 'color var(--dur-base) var(--ease-out)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: '0.9375rem',
      lineHeight: 1.55,
      color: hover ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
      transition: 'color var(--dur-base) var(--ease-out)'
    }
  }, children));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
/**
 * Wemul accordion — FAQ / expandable rows. One item open at a time by
 * default. Coral plus/minus indicator, smooth height reveal.
 */
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [0],
  style = {}
}) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = i => {
    setOpen(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);else next.add(i);
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      ...style
    }
  }, items.map((it, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: '#fff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: isOpen ? 'var(--shadow-sm)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        width: '100%',
        padding: '1rem 1.25rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.0625rem',
        color: 'var(--navy-500)',
        textAlign: 'left'
      }
    }, it.q, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        width: 26,
        height: 26,
        borderRadius: '50%',
        background: isOpen ? 'var(--coral-500)' : 'var(--coral-50)',
        color: isOpen ? '#fff' : 'var(--coral-500)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 700,
        transition: 'all var(--dur-fast) var(--ease-out)'
      }
    }, isOpen ? '–' : '+')), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 360 : 0,
        overflow: 'hidden',
        transition: 'max-height var(--dur-slow) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 1.25rem 1.15rem',
        fontFamily: 'var(--font-text)',
        fontSize: '0.9375rem',
        lineHeight: 1.6,
        color: 'var(--text-muted)'
      }
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tabs.jsx
try { (() => {
/**
 * Wemul tabs — pill-style segmented control with a sliding active state.
 * Use for switching content sections (e.g. service categories).
 */
function Tabs({
  tabs = [],
  defaultIndex = 0,
  onChange,
  style = {}
}) {
  const [active, setActive] = React.useState(defaultIndex);
  const select = i => {
    setActive(i);
    onChange && onChange(i);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      background: 'var(--ink-50)',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border-subtle)'
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => select(i),
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 600,
      fontSize: '0.9375rem',
      padding: '0.5rem 1.1rem',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      cursor: 'pointer',
      background: active === i ? 'var(--navy-500)' : 'transparent',
      color: active === i ? '#fff' : 'var(--text-muted)',
      transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)'
    }
  }, t.label))), tabs[active] && tabs[active].content !== undefined && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, tabs[active].content));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wemul checkbox — coral check, rounded box, label to the right. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style = {},
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.6rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-text)',
      fontSize: '0.9375rem',
      color: 'var(--text-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    role: "checkbox",
    "aria-checked": on,
    style: {
      width: 22,
      height: 22,
      flex: 'none',
      borderRadius: 6,
      border: on ? '2px solid var(--coral-500)' : '2px solid var(--border-default)',
      background: on ? 'var(--coral-500)' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 13,
      fontWeight: 700,
      transition: 'all var(--dur-fast) var(--ease-snap)'
    }
  }, on && '✓'), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul text input — label, optional hint/error, blue focus ring.
 */
function Input({
  label,
  hint,
  error,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || `in-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? 'var(--error)' : focus ? 'var(--blue-500)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 500,
      fontSize: '0.875rem',
      color: 'var(--navy-500)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '1rem',
      color: 'var(--text-body)',
      padding: '0.7rem 0.9rem',
      background: '#fff',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '0.8125rem',
      color: error ? 'var(--error)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wemul select — native dropdown styled to match Input. */
function Select({
  label,
  hint,
  error,
  id,
  options = [],
  children,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || `sel-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? 'var(--error)' : focus ? 'var(--blue-500)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 500,
      fontSize: '0.875rem',
      color: 'var(--navy-500)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '1rem',
      color: 'var(--text-body)',
      padding: '0.7rem 2.2rem 0.7rem 0.9rem',
      background: '#fff',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      appearance: 'none',
      cursor: 'pointer',
      boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)), children), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: '0.9rem',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      fontSize: '0.7rem'
    }
  }, "\u25BC")), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '0.8125rem',
      color: error ? 'var(--error)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wemul multi-line text area — matches Input styling. */
function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || `ta-${Math.random().toString(36).slice(2, 8)}`;
  const borderColor = error ? 'var(--error)' : focus ? 'var(--blue-500)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 500,
      fontSize: '0.875rem',
      color: 'var(--navy-500)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '1rem',
      color: 'var(--text-body)',
      padding: '0.7rem 0.9rem',
      background: '#fff',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      resize: 'vertical',
      lineHeight: 1.5,
      boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '0.8125rem',
      color: error ? 'var(--error)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/pills/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul badge — small status/category marker. Includes the brand
 * "seal" presets (case / viral / performance / social-first) in
 * Gabarito uppercase, plus UI status colors.
 */
function Badge({
  children,
  tone = 'navy',
  seal = false,
  style = {},
  ...rest
}) {
  const tones = {
    navy: ['var(--navy-500)', '#fff'],
    coral: ['var(--coral-500)', '#fff'],
    blue: ['var(--blue-500)', '#fff'],
    sky: ['var(--wemul-sky)', 'var(--navy-500)'],
    success: ['var(--success-bg)', 'var(--success)'],
    warning: ['var(--warning-bg)', '#9A6300'],
    error: ['var(--error-bg)', 'var(--error)'],
    info: ['var(--info-bg)', 'var(--blue-700)']
  };
  const [bg, fg] = tones[tone] || tones.navy;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      fontFamily: seal ? 'var(--font-display)' : 'var(--font-text)',
      fontWeight: seal ? 800 : 700,
      fontSize: seal ? '0.8125rem' : '0.6875rem',
      letterSpacing: seal ? '0.04em' : '0.02em',
      textTransform: seal ? 'uppercase' : 'none',
      padding: seal ? '0.35rem 0.85rem' : '0.2rem 0.55rem',
      background: bg,
      color: fg,
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/pills/Badge.jsx", error: String((e && e.message) || e) }); }

// components/pills/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul pill — the blue capsule used to spotlight a key concept
 * (e.g. "social-first"). Filled or soft.
 */
function Pill({
  children,
  color = 'blue',
  soft = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const palette = {
    blue: {
      solid: ['var(--blue-500)', '#fff'],
      soft: ['var(--blue-50)', 'var(--blue-700)']
    },
    coral: {
      solid: ['var(--coral-500)', '#fff'],
      soft: ['var(--coral-50)', 'var(--coral-700)']
    },
    navy: {
      solid: ['var(--navy-500)', '#fff'],
      soft: ['var(--navy-50)', 'var(--navy-500)']
    },
    sky: {
      solid: ['var(--wemul-sky)', 'var(--navy-500)'],
      soft: ['var(--blue-50)', 'var(--navy-500)']
    }
  };
  const [bg, fg] = palette[color][soft ? 'soft' : 'solid'];
  const sizes = {
    sm: ['0.75rem', '0.25rem 0.7rem'],
    md: ['0.8125rem', '0.4rem 0.9rem'],
    lg: ['0.9375rem', '0.55rem 1.2rem']
  };
  const [fs, pad] = sizes[size];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontFamily: 'var(--font-text)',
      fontWeight: 600,
      fontSize: fs,
      padding: pad,
      background: bg,
      color: fg,
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/pills/Pill.jsx", error: String((e && e.message) || e) }); }

// components/pills/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wemul tag — outline chip for filters, categories and metadata.
 * Optional leading dot. Can be made interactive/removable.
 */
function Tag({
  children,
  color = 'navy',
  removable = false,
  onRemove,
  dot = false,
  style = {},
  ...rest
}) {
  const colors = {
    navy: 'var(--navy-500)',
    coral: 'var(--coral-500)',
    blue: 'var(--blue-600)',
    muted: 'var(--text-muted)'
  };
  const c = colors[color] || colors.navy;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontFamily: 'var(--font-text)',
      fontWeight: 500,
      fontSize: '0.8125rem',
      padding: '0.3rem 0.75rem',
      color: c,
      background: '#fff',
      border: '1.5px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 2,
      background: c
    }
  }), children, removable && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "remove",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: c,
      padding: 0,
      margin: 0,
      fontSize: '0.9rem',
      lineHeight: 1,
      display: 'inline-flex'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/pills/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CTA.jsx
try { (() => {
// Wemul website — CTA + Contact block (Contacto)
const {
  Button,
  Input,
  Textarea,
  Select
} = window.WemulDesignSystem_f56d87;
function CTA({
  onSent
}) {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Contact",
    id: "contacto",
    style: {
      background: 'var(--coral-500)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '100px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center'
    },
    className: "wm-2col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(2.25rem, 5vw, 4rem)',
      lineHeight: 0.98,
      letterSpacing: '-0.03em',
      color: '#fff'
    }
  }, "Hagamos crecer tu marca."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 0',
      maxWidth: '42ch',
      fontFamily: 'var(--font-text)',
      fontSize: '1.1875rem',
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.92)'
    }
  }, "Cu\xE9ntanos tu desaf\xEDo y te mostramos c\xF3mo lo convertimos en contenido que mueve resultados."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: 'var(--font-text)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:hola@wemul.com",
    style: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 700,
      fontSize: 18
    }
  }, "hola@wemul.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.85
    }
  }, "Santiago de Chile"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-xl)',
      padding: 32,
      boxShadow: 'var(--shadow-xl)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 280,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--success-bg)',
      color: 'var(--success)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 26,
      fontWeight: 700
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 24,
      color: 'var(--navy-500)'
    }
  }, "\xA1Mensaje enviado!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)'
    }
  }, "Te escribimos dentro de 48 horas.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
      onSent && onSent();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre",
    placeholder: "Tu nombre",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "tu@empresa.com",
    required: true
  }), /*#__PURE__*/React.createElement(Select, {
    label: "\xBFQu\xE9 necesitas?",
    options: ['Creación de contenidos', 'Pauta y amplificación', 'Estrategia digital', 'Campaña social-first']
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Mensaje",
    rows: 3,
    placeholder: "Cu\xE9ntanos tu desaf\xEDo"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "coral",
    size: "lg",
    type: "submit",
    fullWidth: true
  }, "Enviar mensaje"))))));
}
window.CTA = CTA;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CTA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Experience.jsx
try { (() => {
// Wemul website — Experience / client roster (Nuestra experiencia)
function Experience() {
  // Real Wemul client roster. Rendered as a clean typographic grid —
  // swap each cell for the official client logo when assets are available.
  const clients = ['Sodimac HUM', 'Sodimac Constructor', 'Sodimac Homecenter', 'Bilz y Pap', 'La Roja', 'Coca-Cola', 'TNT Sports', 'Fanta', 'TV+', 'Gobierno de Chile', 'Disney', 'Sprite'];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Experience",
    id: "experiencia",
    style: {
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '110px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "wm-eyebrow",
    style: {
      color: 'var(--blue-600)'
    }
  }, "Nuestra experiencia"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--navy-500)'
    }
  }, "Marcas que ya conf\xEDan en nosotros.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '34ch',
      fontFamily: 'var(--font-text)',
      fontSize: '1.0625rem',
      lineHeight: 1.55,
      color: 'var(--text-muted)'
    }
  }, "Capaces de trabajar con grandes marcas, con la agilidad de un centro de creaci\xF3n.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 0,
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    },
    className: "wm-logos"
  }, clients.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 104,
      padding: 16,
      borderRight: i % 4 !== 3 ? '1px solid var(--border-subtle)' : 'none',
      borderBottom: i < clients.length - 4 ? '1px solid var(--border-subtle)' : 'none',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '-0.01em',
      color: 'var(--navy-400)',
      textAlign: 'center',
      transition: 'color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
      cursor: 'default'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--coral-500)';
      e.currentTarget.style.background = 'var(--ink-25)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--navy-400)';
      e.currentTarget.style.background = 'transparent';
    }
  }, c)))));
}
window.Experience = Experience;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Experience.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Wemul website — Footer
const {
  IconButton
} = window.WemulDesignSystem_f56d87;
function Footer({
  onNav
}) {
  const cols = [{
    h: 'Wemul',
    links: ['Quiénes somos', 'Qué hacemos', 'Experiencia', 'Portafolio']
  }, {
    h: 'Redes propias',
    links: ['Woki Toki', 'Daplei']
  }, {
    h: 'Contacto',
    links: ['hola@wemul.com', 'Santiago, Chile']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--navy-600)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '72px 32px 36px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
      gap: 40
    },
    className: "wm-foot"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wemul-icon.png",
    alt: "",
    style: {
      width: 30,
      height: 31,
      imageRendering: 'pixelated',
      filter: 'brightness(0) invert(1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 24,
      letterSpacing: '-0.02em'
    }
  }, "WEMUL")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '30ch',
      fontFamily: 'var(--font-text)',
      fontSize: 15,
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "Centro de creaci\xF3n para redes sociales. Creamos contenidos para medios sociales."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 22
    }
  }, ['in', 'IG', 'TT', 'YT'].map(s => /*#__PURE__*/React.createElement(IconButton, {
    key: s,
    variant: "ghost",
    label: s,
    style: {
      background: 'rgba(255,255,255,0.1)',
      color: '#fff',
      border: 'none',
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 13
    }
  }, s)))), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--wemul-sky)',
      marginBottom: 16
    }
  }, c.h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, c.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav && onNav(l);
    },
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 15,
      color: 'rgba(255,255,255,0.78)',
      textDecoration: 'none'
    },
    onMouseEnter: e => e.target.style.color = '#fff',
    onMouseLeave: e => e.target.style.color = 'rgba(255,255,255,0.78)'
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 24,
      borderTop: '1px solid rgba(255,255,255,0.14)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontFamily: 'var(--font-text)',
      fontSize: 13,
      color: 'rgba(255,255,255,0.6)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Wemul. Todos los derechos reservados."), /*#__PURE__*/React.createElement("span", null, "Hecho con creatividad estrat\xE9gica."))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
// Wemul website — Header / navbar
const {
  Button,
  IconButton
} = window.WemulDesignSystem_f56d87;
function Header({
  onNav
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.querySelector('[data-wemul-scroll]') || window;
    const onScroll = () => {
      const y = root === window ? window.scrollY : root.scrollTop;
      setScrolled(y > 12);
    };
    root.addEventListener('scroll', onScroll);
    return () => root.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['Quiénes somos', 'Qué hacemos', 'Experiencia', 'Portafolio', 'Redes propias'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(140%) blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 32px',
      height: 76,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => {
      e.preventDefault();
      onNav && onNav('top');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wemul-icon.png",
    alt: "",
    style: {
      width: 30,
      height: 31,
      imageRendering: 'pixelated'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 24,
      letterSpacing: '-0.02em',
      color: 'var(--navy-500)'
    }
  }, "WEMUL")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      alignItems: 'center'
    },
    className: "wm-nav"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav && onNav(l);
    },
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 500,
      fontSize: 15,
      color: 'var(--navy-500)',
      textDecoration: 'none',
      opacity: 0.85
    },
    onMouseEnter: e => e.target.style.opacity = 1,
    onMouseLeave: e => e.target.style.opacity = 0.85
  }, l))), /*#__PURE__*/React.createElement(Button, {
    variant: "coral",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\xA0\u2192"),
    onClick: () => onNav && onNav('Contacto')
  }, "Hablemos")));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Wemul website — Hero
const {
  Button,
  Pill
} = window.WemulDesignSystem_f56d87;
function PixelMark() {
  // modular pixel/block motif inspired by the huemul isotype
  const grid = [[0, 1, 0, 1, 0], [1, 2, 1, 2, 1], [1, 1, 1, 1, 1], [0, 1, 0, 1, 0]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 18px)',
      gridAutoRows: 18,
      gap: 5
    }
  }, grid.flat().map((v, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      borderRadius: 4,
      background: v === 0 ? 'transparent' : v === 2 ? 'rgba(255,255,255,0.55)' : '#fff'
    }
  })));
}
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Hero",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--coral-500)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 120,
      right: 80,
      opacity: 0.9
    }
  }, /*#__PURE__*/React.createElement(PixelMark, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 60,
      right: 280,
      opacity: 0.4
    }
  }, /*#__PURE__*/React.createElement(PixelMark, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '120px 32px 110px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(255,255,255,0.16)',
      padding: '7px 16px',
      borderRadius: 999,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: '#fff'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#fff'
    }
  }, "Centro de creaci\xF3n para redes sociales")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      maxWidth: 14,
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(2.75rem, 7vw, 6rem)',
      lineHeight: 0.98,
      letterSpacing: '-0.03em',
      color: '#fff',
      maxWidth: '15ch'
    }
  }, "Creamos contenido que mueve marcas en redes sociales"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '28px 0 0',
      maxWidth: '52ch',
      fontFamily: 'var(--font-text)',
      fontSize: 'clamp(1.0625rem, 1.6vw, 1.375rem)',
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.92)'
    }
  }, "Combinamos creatividad estrat\xE9gica, experiencia digital e innovaci\xF3n para transformar ideas en resultados medibles."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 40,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "navy",
    size: "lg",
    onClick: () => onNav && onNav('Contacto')
  }, "Hablemos de tu marca"), /*#__PURE__*/React.createElement(Button, {
    variant: "white",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\xA0\u2192"),
    onClick: () => onNav && onNav('Portafolio')
  }, "Ver portafolio"))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Manifesto.jsx
try { (() => {
// Wemul website — Manifesto / intro (Quiénes somos)
const {
  Pill
} = window.WemulDesignSystem_f56d87;
function Manifesto() {
  const words = ['Creamos', 'Amplificamos', 'Administramos'];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Manifesto",
    id: "quienes",
    style: {
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '110px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center'
    },
    className: "wm-2col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "wm-eyebrow",
    style: {
      color: 'var(--blue-600)'
    }
  }, "Qui\xE9nes somos"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--navy-500)'
    }
  }, "Menos agencia tradicional, m\xE1s ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--coral-500)'
    }
  }, "laboratorio de contenidos"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '24px 0 0',
      fontFamily: 'var(--font-text)',
      fontSize: '1.1875rem',
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      maxWidth: '46ch'
    }
  }, "Somos un aliado estrat\xE9gico capaz de aportar creatividad, innovaci\xF3n y experiencia digital. Te ayudamos a crecer utilizando creatividad estrat\xE9gica."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 28,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    color: "blue"
  }, "creatividad estrat\xE9gica"), /*#__PURE__*/React.createElement(Pill, {
    color: "coral",
    soft: true
  }, "innovaci\xF3n"), /*#__PURE__*/React.createElement(Pill, {
    color: "navy",
    soft: true
  }, "experiencia digital"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderLeft: '4px solid var(--coral-500)',
      paddingLeft: 32
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
      lineHeight: 1.04,
      letterSpacing: '-0.03em',
      color: i === 1 ? 'var(--blue-500)' : 'var(--navy-500)'
    }
  }, w)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 0',
      fontFamily: 'var(--font-text)',
      fontSize: '1rem',
      lineHeight: 1.55,
      color: 'var(--text-muted)'
    }
  }, "contenidos, ideas y plataformas para medios sociales.")))));
}
window.Manifesto = Manifesto;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Manifesto.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Metrics.jsx
try { (() => {
// Wemul website — Metrics (results module, navy block)
const {
  MetricBlock
} = window.WemulDesignSystem_f56d87;
function Metrics() {
  const metrics = [{
    value: '+12M',
    label: 'seguidores combinados'
  }, {
    value: '+1000M',
    label: 'vistas orgánicas'
  }, {
    value: '+95%',
    label: 'reacciones positivas'
  }, {
    value: '+12M',
    label: 'visualizaciones orgánicas por mes'
  }];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Metrics",
    style: {
      background: 'var(--navy-500)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '90px 32px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wm-eyebrow",
    style: {
      color: 'var(--wemul-sky)'
    }
  }, "Resultados"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 48px',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#fff',
      maxWidth: '20ch'
    }
  }, "Contenido vivo que se traduce en n\xFAmeros."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 28
    },
    className: "wm-4col"
  }, metrics.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      paddingTop: 24,
      borderTop: '2px solid rgba(255,255,255,0.18)'
    }
  }, /*#__PURE__*/React.createElement(MetricBlock, {
    value: m.value,
    label: m.label,
    color: "white"
  }))))));
}
window.Metrics = Metrics;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Metrics.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/OwnNetworks.jsx
try { (() => {
// Wemul website — Own networks (Redes propias: Woki Toki + Daplei)
const {
  Badge,
  Button
} = window.WemulDesignSystem_f56d87;
function OwnNetworks() {
  const nets = [{
    name: 'Woki Toki',
    tag: 'Laboratorio de contenidos',
    body: 'Experimentación y formatos nativos que nacen para volverse cultura.',
    color: 'var(--coral-500)'
  }, {
    name: 'Daplei',
    tag: 'Plataforma de amplificación',
    body: 'Donde probamos, escalamos y amplificamos ideas social-first.',
    color: 'var(--blue-500)'
  }];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "OwnNetworks",
    id: "redes",
    style: {
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '110px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wm-eyebrow",
    style: {
      color: 'var(--blue-600)'
    }
  }, "Redes propias"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 16px',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--navy-500)'
    }
  }, "Nuestro propio laboratorio de internet."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-text)',
      fontSize: '1.0625rem',
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, "No solo creamos para marcas: operamos nuestras propias redes para experimentar, amplificar y mantenernos al filo de la cultura digital.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    },
    className: "wm-2col"
  }, nets.map(n => /*#__PURE__*/React.createElement("div", {
    key: n.name,
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-xl)',
      padding: 40,
      background: 'var(--navy-500)',
      minHeight: 220,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -40,
      right: -40,
      width: 180,
      height: 180,
      borderRadius: '50%',
      background: n.color,
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "sky"
  }, n.tag), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      letterSpacing: '-0.02em',
      color: '#fff',
      margin: '18px 0 10px'
    }
  }, n.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '34ch',
      fontFamily: 'var(--font-text)',
      fontSize: '1rem',
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.85)'
    }
  }, n.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "white",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\xA0\u2192")
  }, "Conocer")))))));
}
window.OwnNetworks = OwnNetworks;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/OwnNetworks.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Portfolio.jsx
try { (() => {
// Wemul website — Portfolio grid (Nuestro portafolio)
const {
  CaseCard,
  Tag
} = window.WemulDesignSystem_f56d87;
function Portfolio() {
  // Color-block placeholders stand in for real campaign media.
  const cases = [{
    client: 'Sodimac HUM',
    title: 'Universo HUM',
    seal: 'viral',
    metric: '+8M views',
    color: 'coral',
    cat: 'Contenido'
  }, {
    client: 'Bilz y Pap',
    title: 'Mundo paralelo',
    seal: 'social-first',
    metric: '+5M alcance',
    color: 'blue',
    cat: 'Campaña'
  }, {
    client: 'TNT Sports',
    title: 'La previa',
    seal: 'performance',
    metric: '+12M vistas',
    color: 'navy',
    cat: 'Contenido'
  }, {
    client: 'Coca-Cola',
    title: 'Real Magic',
    seal: 'case',
    metric: '+95% positivas',
    color: 'coral',
    cat: 'Campaña'
  }, {
    client: 'La Roja',
    title: 'Hinchada digital',
    seal: 'viral',
    metric: '+3M interac.',
    color: 'blue',
    cat: 'Comunidad'
  }, {
    client: 'Disney',
    title: 'Estrenos',
    seal: 'social-first',
    metric: '+6M reach',
    color: 'navy',
    cat: 'Contenido'
  }];
  const cats = ['Todos', 'Contenido', 'Campaña', 'Comunidad'];
  const [active, setActive] = React.useState('Todos');
  const shown = active === 'Todos' ? cases : cases.filter(c => c.cat === active);
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Portfolio",
    id: "portafolio",
    style: {
      background: 'var(--ink-25)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '110px 32px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wm-eyebrow",
    style: {
      color: 'var(--blue-600)'
    }
  }, "Nuestro portafolio"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 28px',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--navy-500)'
    }
  }, "Casos que se sienten en la cultura."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 36,
      flexWrap: 'wrap'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setActive(c),
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 600,
      fontSize: 14,
      padding: '0.5rem 1.1rem',
      borderRadius: 999,
      cursor: 'pointer',
      border: '1.5px solid ' + (active === c ? 'var(--navy-500)' : 'var(--border-default)'),
      background: active === c ? 'var(--navy-500)' : '#fff',
      color: active === c ? '#fff' : 'var(--navy-500)',
      transition: 'all var(--dur-fast) var(--ease-out)'
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    },
    className: "wm-3col"
  }, shown.map(c => /*#__PURE__*/React.createElement(CaseCard, {
    key: c.client + c.title,
    client: c.client,
    title: c.title,
    seal: c.seal,
    metric: c.metric,
    color: c.color
  })))));
}
window.Portfolio = Portfolio;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Portfolio.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
// Wemul website — Services (Qué hacemos)
const {
  ServiceCard
} = window.WemulDesignSystem_f56d87;
function Services() {
  const services = [{
    icon: 'create',
    title: 'Creamos contenidos',
    color: 'blue',
    body: 'Producimos piezas social-first pensadas para cada plataforma y audiencia.'
  }, {
    icon: 'megaphone',
    title: 'Amplificamos ideas',
    color: 'coral',
    body: 'Escalamos el alcance orgánico con distribución y pauta estratégica.'
  }, {
    icon: 'grid',
    title: 'Administramos plataformas',
    color: 'navy',
    body: 'Gestionamos comunidades y canales día a día, con foco en resultados.'
  }, {
    icon: 'compass',
    title: 'Diseñamos estrategias digitales',
    color: 'blue',
    body: 'Definimos el rumbo creativo y de negocio para tu marca en redes.'
  }, {
    icon: 'clapper',
    title: 'Producimos campañas social-first',
    color: 'coral',
    body: 'De la idea a la ejecución: campañas nativas de redes sociales.'
  }, {
    icon: 'gauge',
    title: 'Optimizamos resultados y costos',
    color: 'navy',
    body: 'Maximizamos impacto y eficiencia en cada peso de producción.'
  }];

  // simple inline glyphs (geometric, on-brand) — stand in for the icon set
  const glyph = {
    create: '✎',
    megaphone: '◎',
    grid: '▦',
    compass: '◈',
    clapper: '▷',
    gauge: '◴'
  };
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Services",
    id: "quehacemos",
    style: {
      background: 'var(--ink-25)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '110px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wm-eyebrow",
    style: {
      color: 'var(--blue-600)'
    }
  }, "Qu\xE9 hacemos"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--navy-500)'
    }
  }, "Creamos, amplificamos y administramos.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    },
    className: "wm-3col"
  }, services.map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.title,
    color: s.color,
    title: s.title,
    icon: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24
      }
    }, glyph[s.icon])
  }, s.body)))));
}
window.Services = Services;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CaseCard = __ds_scope.CaseCard;

__ds_ns.MetricBlock = __ds_scope.MetricBlock;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Tag = __ds_scope.Tag;

})();
