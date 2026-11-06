import React from 'react';
import {fontFamily, palette, serifFamily} from '../theme';

const TAU = Math.PI * 2;

const pt = (cx: number, cy: number, r: number, a: number): [number, number] => [
  cx + r * Math.cos(a),
  cy + r * Math.sin(a),
];

const Head: React.FC<{x: number; y: number; angle: number; color: string; size?: number}> = ({
  x,
  y,
  angle,
  color,
  size = 17,
}) => {
  const p = (a: number, r: number) => `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
  return <polygon points={`${x},${y} ${p(angle + 2.55, size)} ${p(angle - 2.55, size)}`} fill={color} />;
};

const arcPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
};

/* Label with a paper-coloured halo behind it, so it stays readable over the drawing. */
const Label: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  anchor?: 'start' | 'middle' | 'end';
  italic?: boolean;
  children: React.ReactNode;
}> = ({x, y, size = 38, color = palette.ink, anchor = 'middle', italic = true, children}) => (
  <>
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={serifFamily}
      fontSize={size}
      fontStyle={italic ? 'italic' : undefined}
      fill={palette.paper}
      stroke={palette.paper}
      strokeWidth={10}
      strokeLinejoin="round"
    >
      {children}
    </text>
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={serifFamily}
      fontSize={size}
      fontStyle={italic ? 'italic' : undefined}
      fill={color}
    >
      {children}
    </text>
  </>
);

/*
 * A curved arrow drawn inside the top of a cylinder showing which way it turns.
 * Angles are measured with y pointing down, so a decreasing angle travels
 * counter-clockwise on screen; the arc always runs over the top, never under
 * the body, and stays small enough that the two arrows never cross.
 */
const SpinArc: React.FC<{
  cx: number;
  cy: number;
  R: number;
  ccw: boolean;
  color: string;
  label: string;
}> = ({cx, cy, R, ccw, color, label}) => {
  const r = R * 0.78;
  const swing = 0.14;
  const a0 = ccw ? -swing : -Math.PI + swing;
  const a1 = ccw ? -Math.PI + swing : -swing;
  const [x1, y1] = pt(cx, cy, r, a1);
  const vx = ccw ? Math.sin(a1) : -Math.sin(a1);
  const vy = ccw ? -Math.cos(a1) : Math.cos(a1);
  const angle = Math.atan2(vy, vx);
  return (
    <>
      <path d={arcPath(cx, cy, r, a0, a1)} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
      <Head x={x1} y={y1} angle={angle} color={color} size={19} />
      <Label x={cx} y={cy - R - 26} size={42} color={color}>
        {label}
      </Label>
    </>
  );
};

export const CylinderPair: React.FC<{
  angle1?: number;
  angle2?: number;
  R1?: number;
  R2?: number;
  width?: number;
  showRadii?: boolean;
  showOmega?: boolean;
  showFriction?: boolean;
  showContact?: boolean;
  showNames?: boolean;
  tint?: string;
  tint2?: string;
}> = ({
  angle1 = 0,
  angle2 = 0,
  R1 = 132,
  R2 = 94,
  width = 780,
  showRadii = true,
  showOmega = true,
  showFriction = false,
  showContact = false,
  showNames = true,
  tint = palette.indigo,
  tint2 = palette.teal,
}) => {
  const cy = 250;
  const c1x = 46 + R1;
  const c2x = c1x + R1 + R2;
  const vbW = c2x + R2 + 46;
  const vbH = 500;
  const px = c1x + R1;

  const a1 = (angle1 * Math.PI) / 180;
  const a2 = (angle2 * Math.PI) / 180;

  return (
    <svg width={width} height={(width * vbH) / vbW} viewBox={`0 0 ${vbW} ${vbH}`}>
      {/* axes */}
      {[c1x, c2x].map((cx, i) => (
        <g key={`ax-${i}`}>
          <circle cx={cx} cy={cy} r={11} fill={palette.ink} />
        </g>
      ))}

      {/* bodies */}
      <circle cx={c1x} cy={cy} r={R1} fill="#ffffff" stroke={palette.ink} strokeWidth={5} />
      <circle cx={c2x} cy={cy} r={R2} fill="#ffffff" stroke={palette.ink} strokeWidth={5} />
      <circle
        cx={c1x}
        cy={cy}
        r={R1 * 0.66}
        fill="none"
        stroke={palette.rule}
        strokeWidth={2}
        strokeDasharray="8 12"
      />
      <circle
        cx={c2x}
        cy={cy}
        r={R2 * 0.66}
        fill="none"
        stroke={palette.rule}
        strokeWidth={2}
        strokeDasharray="8 12"
      />

      {/* spokes show the rotation */}
      <line
        x1={c1x}
        y1={cy}
        x2={c1x + R1 * Math.cos(a1)}
        y2={cy + R1 * Math.sin(a1)}
        stroke={tint}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <circle cx={c1x + R1 * Math.cos(a1)} cy={cy + R1 * Math.sin(a1)} r={9} fill={tint} />
      <line
        x1={c2x}
        y1={cy}
        x2={c2x + R2 * Math.cos(a2)}
        y2={cy + R2 * Math.sin(a2)}
        stroke={tint2}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <circle cx={c2x + R2 * Math.cos(a2)} cy={cy + R2 * Math.sin(a2)} r={9} fill={tint2} />

      {/* the two radii, drawn out to the contact point */}
      {showRadii ? (
        <g>
          <line
            x1={c1x}
            y1={cy}
            x2={px}
            y2={cy}
            stroke={palette.ink}
            strokeWidth={4}
            strokeDasharray="12 10"
          />
          <line
            x1={c2x}
            y1={cy}
            x2={px}
            y2={cy}
            stroke={palette.ink}
            strokeWidth={4}
            strokeDasharray="12 10"
          />
          <Label x={c1x + R1 * 0.5} y={cy + 46} size={40}>
            r₁
          </Label>
          <Label x={c2x - R2 * 0.5} y={cy + 46} size={40}>
            r₂
          </Label>
        </g>
      ) : null}

      {showOmega ? (
        <>
          <SpinArc cx={c1x} cy={cy} R={R1} ccw color={tint} label="ω₁" />
          <SpinArc cx={c2x} cy={cy} R={R2} ccw={false} color={tint2} label="ω₂" />
        </>
      ) : null}

      {showNames ? (
        <>
          <Label x={c1x} y={cy + R1 + 52} color={palette.inkSoft}>
            I₁
          </Label>
          <Label x={c2x} y={cy + R2 + 52} color={palette.inkSoft}>
            I₂
          </Label>
        </>
      ) : null}

      {showContact ? <circle cx={px} cy={cy} r={12} fill={palette.amberDeep} /> : null}

      {showFriction ? (
        <>
          <line
            x1={px - 30}
            y1={cy - 74}
            x2={px - 30}
            y2={cy + 60}
            stroke={palette.teal}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <Head x={px - 30} y={cy + 62} angle={Math.PI / 2} color={palette.teal} size={22} />
          <line
            x1={px + 30}
            y1={cy + 74}
            x2={px + 30}
            y2={cy - 60}
            stroke={palette.amberDeep}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <Head x={px + 30} y={cy - 62} angle={-Math.PI / 2} color={palette.amberDeep} size={22} />
          <Label x={px - 58} y={cy + 16} anchor="end" color={palette.teal}>
            f
          </Label>
          <Label x={px + 58} y={cy + 16} anchor="start" color={palette.amberDeep}>
            f
          </Label>
        </>
      ) : null}
    </svg>
  );
};

export const Bars: React.FC<{heights: number[]; labels?: string[]; accent?: string; caption?: string}> = ({
  heights,
  labels,
  accent = palette.indigo,
  caption,
}) => {
  const w = 110;
  const gap = 60;
  const base = 330;
  const total = heights.length * w + (heights.length - 1) * gap + 120;
  return (
    <svg width={total} height={430} viewBox={`0 0 ${total} 430`}>
      <line x1={30} y1={base} x2={total - 30} y2={base} stroke={palette.rule} strokeWidth={4} strokeLinecap="round" />
      {heights.map((h, i) => (
        <g key={i}>
          <rect
            x={60 + i * (w + gap)}
            y={base - h}
            width={w}
            height={h}
            rx={14}
            fill={i === heights.length - 1 ? accent : palette.indigoSoft}
          />
          {labels && labels[i] ? (
            <text
              x={60 + i * (w + gap) + w / 2}
              y={base - h - 20}
              textAnchor="middle"
              fontFamily={fontFamily}
              fontSize={30}
              fontWeight={700}
              fill={palette.inkSoft}
            >
              {labels[i]}
            </text>
          ) : null}
        </g>
      ))}
      {caption ? (
        <text x={60} y={392} fontFamily={fontFamily} fontSize={26} fill={palette.muted}>
          {caption}
        </text>
      ) : null}
    </svg>
  );
};

export const SpinGlyph: React.FC<{size?: number; color?: string}> = ({size = 300, color = palette.indigo}) => (
  <svg width={size} height={size} viewBox="0 0 300 300">
    <path d={arcPath(150, 150, 110, -2.4, 1.2)} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" />
    <Head x={150 + 110 * Math.cos(1.2)} y={150 + 110 * Math.sin(1.2)} angle={1.2 + Math.PI / 2} color={color} size={22} />
    <circle cx={150} cy={150} r={16} fill={color} />
  </svg>
);

export const TAU_CONST = TAU;
