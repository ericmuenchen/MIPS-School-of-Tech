/* @ds-bundle: {"format":4,"namespace":"MIPSDesignSystem_6fe64d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconSwatch","sourcePath":"components/core/IconSwatch.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"d355a37ea8d5","components/core/Button.jsx":"34698cfdf6e1","components/core/Card.jsx":"383bba75f349","components/core/IconSwatch.jsx":"3852c5d0e4e6","components/feedback/Dialog.jsx":"ce5e2cd360aa","components/feedback/Toast.jsx":"83195e971359","components/feedback/Tooltip.jsx":"e3fd61fd9785","components/forms/Checkbox.jsx":"05c7bcbd2607","components/forms/Input.jsx":"792c470d0e24","components/forms/Radio.jsx":"b91fac35e599","components/forms/Select.jsx":"520b9e452b59","components/forms/Switch.jsx":"6c83607af0e5","components/navigation/Tabs.jsx":"daae2fb169e3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MIPSDesignSystem_6fe64d = window.MIPSDesignSystem_6fe64d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Small pill label for statuses/tags, e.g. "Grades K-5", "New", "Open Enrollment".
 */
function Badge({
  children,
  tone = 'navy'
}) {
  const tones = {
    navy: {
      background: 'var(--surface-navy)',
      color: 'var(--text-on-navy)'
    },
    maize: {
      background: 'var(--accent-primary)',
      color: 'var(--brand-primary)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--brand-primary)',
      border: 'var(--border-width-thin) solid var(--brand-primary)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '5px 14px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      ...tones[tone]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Pill-shaped button, MIPS's primary interactive control.
 * Variants: "outline" (thin navy outline, dark text, used for most CTAs
 * like "Student Login" / "Get Started"), "solid" (navy fill, white text,
 * for the single strongest CTA on a screen), "maize" (yellow fill, navy
 * text, for high-energy highlight moments, use sparingly).
 */
function Button({
  children,
  variant = 'outline',
  size = 'md',
  icon,
  disabled = false,
  onClick,
  type = 'button'
}) {
  const sizes = {
    sm: {
      padding: '8px 20px',
      font: 'var(--text-label)'
    },
    md: {
      padding: '13px 30px',
      font: '600 16px/1.2 var(--font-body)'
    },
    lg: {
      padding: '17px 40px',
      font: '600 18px/1.2 var(--font-body)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'default' : 'pointer',
    transition: 'all 150ms ease',
    opacity: disabled ? 0.45 : 1,
    ...sizes[size]
  };
  const variants = {
    outline: {
      background: 'var(--surface-page)',
      color: 'var(--brand-primary)',
      border: 'var(--border-width-thin) solid var(--brand-primary)'
    },
    solid: {
      background: 'var(--brand-primary)',
      color: 'var(--text-on-navy)',
      border: 'var(--border-width-thin) solid var(--brand-primary)'
    },
    maize: {
      background: 'var(--accent-primary)',
      color: 'var(--brand-primary)',
      border: 'var(--border-width-thin) solid var(--accent-primary)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...variants[variant]
    },
    onMouseEnter: e => {
      if (disabled) return;
      if (variant === 'outline') e.currentTarget.style.background = 'var(--surface-muted)';
      if (variant === 'solid') e.currentTarget.style.background = 'var(--brand-primary-hover)';
      if (variant === 'maize') e.currentTarget.style.background = 'var(--accent-primary-hover)';
    },
    onMouseLeave: e => {
      if (disabled) return;
      if (variant === 'outline') e.currentTarget.style.background = 'var(--surface-page)';
      if (variant === 'solid') e.currentTarget.style.background = 'var(--brand-primary)';
      if (variant === 'maize') e.currentTarget.style.background = 'var(--accent-primary)';
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/**
 * Simple white surface card, subtle shadow, generous rounding, no heavy borders.
 * Used for quick-facts tiles, testimonial tiles, program tiles.
 */
function Card({
  children,
  padding = 'var(--space-6)',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      padding,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconSwatch.jsx
try { (() => {
/**
 * Yellow accent circle behind a navy line icon, MIPS's signature
 * visual device (used behind medal/handshake/laptop icons etc).
 * Pass any single-color-stroke icon (e.g. a Lucide icon) as children;
 * it's recolored to navy via currentColor.
 */
function IconSwatch({
  children,
  size = 72
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--accent-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      color: 'var(--brand-primary)',
      width: size * 0.56,
      height: size * 0.56,
      display: 'inline-flex'
    }
  }, children));
}
Object.assign(__ds_scope, { IconSwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconSwatch.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/** Centered modal dialog with scrim, rounded card, close button. */
function Dialog({
  open,
  onClose,
  title,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(20,20,20,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: 'var(--space-6)',
      maxWidth: 440,
      width: '90%',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      background: 'none',
      border: 'none',
      fontSize: 20,
      color: 'var(--text-body)',
      cursor: 'pointer'
    }
  }, "\xD7"), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--text-display-sm)',
      marginBottom: 'var(--space-4)'
    }
  }, title), children));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/** Toast notification banner, success/info/error, dismissible. */
function Toast({
  tone = 'info',
  children,
  onDismiss
}) {
  const tones = {
    info: {
      background: 'var(--brand-primary)',
      color: 'var(--text-on-navy)'
    },
    success: {
      background: 'var(--color-navy-700, #1B2A63)',
      color: 'var(--text-on-navy)'
    },
    error: {
      background: 'var(--state-error)',
      color: '#fff'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '14px 20px',
      borderRadius: 'var(--radius-md)',
      font: 'var(--text-body-sm)',
      boxShadow: 'var(--shadow-lg)',
      ...tones[tone]
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    style: {
      background: 'none',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: 18,
      lineHeight: 1,
      opacity: 0.8
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Rounded tooltip bubble, navy background, appears above trigger on hover. */
function Tooltip({
  children,
  label
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--brand-primary)',
      color: 'var(--text-on-navy)',
      font: 'var(--text-caption)',
      padding: '6px 12px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Rounded checkbox with navy check. */
function Checkbox({
  label,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      font: 'var(--text-body-md)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '6px',
      border: 'var(--border-width-md) solid var(--brand-primary)',
      background: checked ? 'var(--brand-primary)' : 'var(--surface-page)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "10",
    viewBox: "0 0 12 10",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 5L4.5 8.5L11 1.5",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
/** Text input with label, helper text, and error state (red asterisk for required). */
function Input({
  label,
  placeholder,
  required = false,
  error,
  type = 'text',
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-headline)'
    }
  }, label, " ", required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--state-error)'
    }
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: {
      font: 'var(--text-body-md)',
      padding: '11px 16px',
      borderRadius: 'var(--radius-sm)',
      border: `var(--border-width-thin) solid ${error ? 'var(--state-error)' : 'var(--border-default)'}`,
      outline: 'none',
      color: 'var(--text-body)'
    },
    onFocus: e => e.currentTarget.style.borderColor = 'var(--state-focus)',
    onBlur: e => e.currentTarget.style.borderColor = error ? 'var(--state-error)' : 'var(--border-default)'
  }), error && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-caption)',
      color: 'var(--state-error)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Circular radio button with navy dot. */
function Radio({
  label,
  checked,
  onChange,
  name
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      font: 'var(--text-body-md)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: 'var(--border-width-md) solid var(--brand-primary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--brand-primary)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    onChange: onChange,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/** Native-backed select styled to match Input. */
function Select({
  label,
  options = [],
  required = false,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-label)',
      color: 'var(--text-headline)'
    }
  }, label, " ", required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--state-error)'
    }
  }, "*")), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    style: {
      font: 'var(--text-body-md)',
      padding: '11px 16px',
      borderRadius: 'var(--radius-sm)',
      border: 'var(--border-width-thin) solid var(--border-default)',
      color: 'var(--text-body)',
      background: 'var(--surface-page)'
    }
  }, options.map(opt => /*#__PURE__*/React.createElement("option", {
    key: opt,
    value: opt
  }, opt))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** Toggle switch, navy when on. */
function Switch({
  checked,
  onChange,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      font: 'var(--text-body-md)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 42,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--brand-primary)' : 'var(--gray-300, #d8d8d8)',
      position: 'relative',
      transition: 'background 150ms ease',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 21 : 3,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'white',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left 150ms ease'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Underline-indicator tab bar. */
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      borderBottom: 'var(--border-width-thin) solid var(--border-default)'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => onChange && onChange(t),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '12px 2px',
      font: t === active ? '700 16px var(--font-body)' : '400 16px var(--font-body)',
      color: t === active ? 'var(--brand-primary)' : 'var(--text-body)',
      borderBottom: t === active ? '3px solid var(--accent-primary)' : '3px solid transparent',
      marginBottom: '-1.5px'
    }
  }, t)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconSwatch = __ds_scope.IconSwatch;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
