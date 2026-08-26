import React from 'react';

interface TelemetryItemProps {
  value: string | number;
  label: string;
  isAccent?: boolean;
  className?: string;
}

export const TelemetryItem: React.FC<TelemetryItemProps> = ({
  value,
  label,
  isAccent = false,
  className = '',
}) => {
  return (
    <div className={`telemetry-metric flex flex-col ${className}`}>
      <span
        className={`font-display italic text-4xl md:text-5xl leading-none tracking-tight font-bold ${
          isAccent ? 'text-[#E4492E]' : 'text-[#0D0D0D]'
        }`}
      >
        {value}
      </span>
      <span className="font-mono text-[10px] md:text-xs text-[#656464] uppercase mt-1 tracking-wider font-bold">
        {label}
      </span>
    </div>
  );
};
