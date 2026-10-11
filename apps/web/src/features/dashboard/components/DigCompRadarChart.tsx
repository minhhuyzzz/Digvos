'use client';

import React, { useState } from 'react';
import { Target, ChevronRight, Info } from 'lucide-react';

export interface DigCompDomainScore {
  key: string;
  name: string;
  score: number; // 0 - 100
  target: number; // Target score
  level: string; // e.g. Level 4 (Intermediate)
}

interface DigCompRadarChartProps {
  data?: DigCompDomainScore[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_DOMAINS: DigCompDomainScore[] = [
  { key: 'data', name: '1. Vận hành Dữ liệu & Thông tin', score: 85, target: 90, level: 'Cấp độ 5 - Advanced' },
  { key: 'comm', name: '2. Giao tiếp & Cộng tác số', score: 78, target: 85, level: 'Cấp độ 4 - Intermediate' },
  { key: 'creation', name: '3. Sáng tạo Nội dung số', score: 62, target: 80, level: 'Cấp độ 3 - Intermediate' },
  { key: 'safety', name: '4. An toàn & Bảo mật số', score: 90, target: 95, level: 'Cấp độ 6 - Advanced' },
  { key: 'problem', name: '5. Giải quyết Vấn đề Kỹ thuật', score: 70, target: 85, level: 'Cấp độ 4 - Intermediate' },
];

export const DigCompRadarChart: React.FC<DigCompRadarChartProps> = ({
  data = DEFAULT_DOMAINS,
  title = 'Bản Đồ Năng Lực Số (DigComp 3.0)',
  subtitle = 'Phân tích mức độ thành thạo 5 vùng năng lực cốt lõi'
}) => {
  const [activeDomain, setActiveDomain] = useState<DigCompDomainScore | null>(data[0]);

  // Calculations for 5-axis Radar SVG
  const size = 280;
  const center = size / 2;
  const radius = 95;
  const numAxes = data.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // SVG points
  const pointsCurrent = data.map((d, i) => getCoordinates(i, d.score / 100));
  const pointsTarget = data.map((d, i) => getCoordinates(i, d.target / 100));

  const svgPolygonStringCurrent = pointsCurrent.map(p => `${p.x},${p.y}`).join(' ');
  const svgPolygonStringTarget = pointsTarget.map(p => `${p.x},${p.y}`).join(' ');
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-2xs space-y-5">
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1f5f9] pb-3">
          <div>
            <h3 className="font-bold text-sm text-[#0f172a]">{title}</h3>
            {subtitle && <p className="text-xs text-[#64748b] mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#475569]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0f172a]" />
              <span>Điểm hiện tại</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1] border border-dashed border-[#94a3b8]" />
              <span>Mục tiêu</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Radar Visualization (Monochromatic High-Contrast) */}
        <div className="lg:col-span-5 flex justify-center py-2">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
            {/* Grid Levels */}
            {gridLevels.map((levelRatio, idx) => {
              const gridPoints = data.map((_, i) => getCoordinates(i, levelRatio)).map(p => `${p.x},${p.y}`).join(' ');
              return (
                <polygon
                  key={idx}
                  points={gridPoints}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray={idx === gridLevels.length - 1 ? "none" : "2,2"}
                />
              );
            })}

            {/* Axes Lines */}
            {data.map((_, i) => {
              const outer = getCoordinates(i, 1.0);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              );
            })}

            {/* Target Area (Light Gray Dashed) */}
            <polygon
              points={svgPolygonStringTarget}
              fill="rgba(241, 245, 249, 0.4)"
              stroke="#94a3b8"
              strokeWidth="1"
              strokeDasharray="3,3"
            />

            {/* Current Score Polygon (Crisp Black/Dark Slate Fill) */}
            <polygon
              points={svgPolygonStringCurrent}
              fill="rgba(15, 23, 42, 0.12)"
              stroke="#0f172a"
              strokeWidth="2"
            />

            {/* Points */}
            {pointsCurrent.map((pt, i) => (
              <g key={i} className="cursor-pointer" onClick={() => setActiveDomain(data[i])}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={activeDomain?.key === data[i].key ? "5" : "3.5"}
                  className="fill-white stroke-[#0f172a] stroke-2 hover:r-5 transition-all"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Structured Monochromatic Detail Breakdown */}
        <div className="lg:col-span-7 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block mb-2">
            Chi tiết 5 Vùng Năng Lực
          </span>
          {data.map((domain) => {
            const isSelected = activeDomain?.key === domain.key;
            const gap = domain.target - domain.score;
            return (
              <div
                key={domain.key}
                onClick={() => setActiveDomain(domain)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0f172a] bg-[#f8fafc]'
                    : 'border-[#e2e8f0] bg-white hover:bg-[#f8fafc]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#0f172a]' : 'text-[#334155]'}`}>
                    {domain.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0f172a]">
                    {domain.score}/100
                  </span>
                </div>

                <div className="w-full bg-[#e2e8f0] rounded-full h-1.5 overflow-hidden mb-1">
                  <div
                    className="bg-[#0f172a] h-full rounded-full transition-all duration-300"
                    style={{ width: `${domain.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>{domain.level}</span>
                  {gap > 0 ? (
                    <span className="font-medium text-[#475569]">
                      Mục tiêu: {domain.target} (Thiếu -{gap})
                    </span>
                  ) : (
                    <span className="font-semibold text-[#0f172a]">
                      ✓ Đạt mục tiêu
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
