function toPascalCase(name) {
  return name.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function LucideIcon({ name, size = 28 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      const iconNode = window.lucide.icons[toPascalCase(name)];
      if (iconNode) {
        const svg = window.lucide.createElement(iconNode);
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('stroke', 'currentColor');
        ref.current.innerHTML = '';
        ref.current.appendChild(svg);
      }
    }
  }, [name]);
  return React.createElement('span', { ref, style: { display: 'inline-flex' } });
}
module.exports = { LucideIcon };
