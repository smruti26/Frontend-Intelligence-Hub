/**
 * src/components/common/Button.tsx
 * ─────────────────────────────────────────────────────────────────
 * Reusable Button component.
 * Variants: primary | ghost | canvas (for animation controls)
 * Sizes:    sm | md | lg
 *
 * Fully accessible: supports aria-* props, keyboard focus ring,
 * and disabled states out of the box.
 */

import React, { forwardRef } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'ghost' | 'canvas' | 'filter';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  isActive?: boolean;
  icon?:     React.ReactNode;
}

// ── Style Maps ────────────────────────────────────────────────────────────

const BASE = `
  display: inline-flex; align-items: center; gap: 6px;
  border: none; border-radius: 8px; cursor: pointer;
  font-weight: 500; transition: all 0.18s;
  outline: none;
`.replace(/\s+/g, ' ').trim();

const VARIANTS: Record<ButtonVariant, string> = {
  primary: `
    background: var(--p600); color: #fff;
    &:hover { background: var(--p700); }
    &:focus-visible { box-shadow: 0 0 0 3px var(--p200); }
  `,
  ghost: `
    background: transparent; color: var(--t2);
    border: 1px solid var(--border);
    &:hover { background: var(--bg); color: var(--t1); }
  `,
  canvas: `
    background: rgba(255,255,255,0.10); color: rgba(255,255,255,0.85);
    border: 1px solid rgba(255,255,255,0.18); border-radius: 20px;
    font-size: 11px;
    &:hover { background: rgba(255,255,255,0.20); color: #fff; }
  `,
  filter: `
    background: var(--bg); color: var(--t2);
    border: 1.5px solid var(--border); border-radius: 999px;
    font-size: 12px; font-weight: 500;
    &:hover { border-color: var(--p400); color: var(--t1); }
  `,
};

const SIZES: Record<ButtonSize, string> = {
  sm:  'padding: 4px 10px; font-size: 11px;',
  md:  'padding: 7px 14px; font-size: 12.5px;',
  lg:  'padding: 10px 20px; font-size: 14px;',
};

// ── Component ─────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant  = 'ghost',
      size     = 'md',
      isActive = false,
      icon,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const activeStyle: React.CSSProperties = isActive
      ? {
          background:  'var(--p600)',
          color:       '#fff',
          borderColor: 'var(--p600)',
        }
      : {};

    return (
      <button
        ref={ref}
        data-variant={variant}
        data-size={size}
        data-active={isActive}
        style={{
          // Inline fallback styles (CSS classes handle the rest in globals.css)
          display:         'inline-flex',
          alignItems:      'center',
          gap:             '6px',
          border:          'none',
          borderRadius:    '8px',
          cursor:          'pointer',
          fontWeight:      500,
          transition:      'all 0.18s',
          ...activeStyle,
          ...style,
        }}
        {...rest}
      >
        {icon && <span className="btn-icon" aria-hidden="true">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
