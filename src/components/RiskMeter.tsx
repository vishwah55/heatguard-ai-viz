import { motion } from "framer-motion";

interface RiskMeterProps {
  score: number; // 0-100
  label: string;
  size?: number;
}

const RiskMeter = ({ score, label, size = 140 }: RiskMeterProps) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const getColor = () => {
    if (score <= 30) return "hsl(142, 71%, 45%)";
    if (score <= 60) return "hsl(48, 96%, 53%)";
    if (score <= 80) return "hsl(25, 95%, 53%)";
    return "hsl(0, 84%, 60%)";
  };

  const getLabel = () => {
    if (score <= 30) return "Low";
    if (score <= 60) return "Moderate";
    if (score <= 80) return "High";
    return "Extreme";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(222, 20%, 20%)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${getColor()})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="stat-counter text-2xl font-bold text-foreground">{score}</span>
          <span className="text-xs font-medium" style={{ color: getColor() }}>
            {getLabel()}
          </span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
};

export default RiskMeter;
