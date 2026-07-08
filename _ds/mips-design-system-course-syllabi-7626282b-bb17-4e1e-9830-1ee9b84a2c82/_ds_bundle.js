/* @ds-bundle: {"format":4,"namespace":"DesignSystem_762628","components":[{"name":"AccentRule","sourcePath":"components/core/AccentRule.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconSwatch","sourcePath":"components/core/IconSwatch.jsx"},{"name":"InfoCard","sourcePath":"components/core/InfoCard.jsx"}],"sourceHashes":{"components/core/AccentRule.jsx":"7e65e4f30f2d","components/core/Badge.jsx":"ffb786d2dd93","components/core/Button.jsx":"af75a9fb29e7","components/core/IconSwatch.jsx":"d35d1c47c46d","components/core/InfoCard.jsx":"31289b0ef969"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_762628 = window.DesignSystem_762628 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/AccentRule.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * AccentRule — the short maize pill divider that precedes every section
 * heading in MIPS documents. Purely decorative.
 */
function AccentRule({
  width = 44,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    "aria-hidden": "true",
    style: {
      height: 5,
      width,
      background: 'var(--color-maize-500)',
      borderRadius: 'var(--radius-pill)'
    }
  }));
}
Object.assign(__ds_scope, { AccentRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AccentRule.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small pill label. Navy (default), maize, or muted gray.
 * Used for eyebrows, unit tags, and status chips.
 */
function Badge({
  variant = 'navy',
  children,
  ...rest
}) {
  const variants = {
    navy: {
      background: 'var(--color-navy-700)',
      color: 'var(--color-white)'
    },
    maize: {
      background: 'var(--color-maize-500)',
      color: 'var(--color-navy-700)'
    },
    muted: {
      background: 'var(--color-gray-100)',
      color: 'var(--color-gray-600)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--text-caption)',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      ...variants[variant]
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIPS pill button. Three variants: solid navy, maize accent, and outline.
 * Always fully pill-shaped; hover deepens color by one step (no opacity fades).
 */
function Button({
  variant = 'solid',
  size = 'md',
  disabled = false,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 18px',
      font: "600 13px/1 var(--font-ui)"
    },
    md: {
      padding: '12px 26px',
      font: "600 15px/1 var(--font-ui)"
    },
    lg: {
      padding: '15px 34px',
      font: "600 17px/1 var(--font-ui)"
    }
  };
  const variants = {
    solid: {
      background: hover ? 'var(--brand-primary-hover)' : 'var(--brand-primary)',
      color: 'var(--color-white)',
      border: '2px solid transparent'
    },
    maize: {
      background: hover ? 'var(--accent-primary-hover)' : 'var(--accent-primary)',
      color: 'var(--color-navy-700)',
      border: '2px solid transparent'
    },
    outline: {
      background: hover ? 'var(--color-gray-100)' : 'transparent',
      color: 'var(--color-navy-700)',
      border: '2px solid var(--color-navy-700)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...sizes[size],
      ...variants[variant],
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background 140ms ease',
      whiteSpace: 'nowrap'
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconSwatch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconSwatch — the MIPS signature device: a maize rounded-square behind a
 * navy line icon. Pass an inline SVG (or any node) as children.
 */
function IconSwatch({
  size = 38,
  radius = 'var(--radius-md)',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: radius,
      background: 'var(--color-maize-500)',
      color: 'var(--color-navy-700)'
    }
  }), children);
}
Object.assign(__ds_scope, { IconSwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconSwatch.jsx", error: String((e && e.message) || e) }); }

// components/core/InfoCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * InfoCard — the MIPS surface panel. `tone` picks the treatment:
 *  - plain: white surface with soft shadow (default)
 *  - maize: light maize-50 highlight panel
 *  - navy:  inverted navy panel for emphasis blocks (e.g. AI policy)
 */
function InfoCard({
  tone = 'plain',
  label,
  children,
  ...rest
}) {
  const tones = {
    plain: {
      background: 'var(--color-white)',
      boxShadow: 'var(--shadow-md)',
      color: 'var(--color-gray-600)',
      labelColor: 'var(--color-navy-700)'
    },
    maize: {
      background: 'var(--color-maize-50)',
      color: 'var(--color-gray-600)',
      labelColor: 'var(--color-navy-700)'
    },
    navy: {
      background: 'var(--color-navy-700)',
      color: 'var(--color-white)',
      labelColor: 'var(--color-maize-500)'
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      background: t.background,
      boxShadow: t.boxShadow,
      color: t.color,
      borderRadius: 'var(--radius-lg)',
      padding: '22px 24px'
    }
  }), label && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-label)',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: t.labelColor,
      marginBottom: 10
    }
  }, label), children);
}
Object.assign(__ds_scope, { InfoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/InfoCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AccentRule = __ds_scope.AccentRule;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconSwatch = __ds_scope.IconSwatch;

__ds_ns.InfoCard = __ds_scope.InfoCard;

})();
