// TypeScript에서는 타입을 명시적으로 정의합니다.
// 이것이 JavaScript와의 가장 큰 차이점입니다.
interface CircularProgressProps {
  value: number; // 진행률 (0-100)
  label: string; // 표시할 레이블
  color: string; // 색상 ('blue', 'green', 'purple' 등)
  size?: number; // 옵션: 크기 (기본값 설정 가능)
}

// FC는 'Function Component'의 약자로, React 컴포넌트의 타입입니다.
// <>안에는 props의 타입을 지정합니다.
const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  label,
  color,
  size = 120, // 기본값 설정
}) => {
  // SVG를 사용한 원형 프로그레스 바 구현
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  // 색상 매핑 객체 (TypeScript에서는 타입 안정성을 위해 이렇게 정의)
  const colorMap: { [key: string]: string } = {
    blue: "#3B82F6",
    green: "#10B981",
    purple: "#8B5CF6",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* 배경 원 */}
        <svg
          className="rotate-[-90deg]"
          width={size}
          height={size}
          viewBox="0 0 100 100"
        >
          <circle
            className="opacity-10"
            stroke={colorMap[color]}
            strokeWidth="8"
            fill="none"
            r={radius}
            cx="50"
            cy="50"
          />
          {/* 진행률을 나타내는 원 */}
          <circle
            stroke={colorMap[color]}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
            r={radius}
            cx="50"
            cy="50"
            style={{
              transition: "stroke-dashoffset 0.5s ease",
            }}
          />
        </svg>
        {/* 중앙의 텍스트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{Math.round(value)}%</span>
          <span className="text-sm text-gray-500">{label}</span>
        </div>
      </div>
    </div>
  );
};

// JavaScript에서는 그냥 export default CircularProgress; 로 끝났겠지만
// TypeScript에서는 명시적으로 타입을 export 할 수도 있습니다.
export { CircularProgress };
export type { CircularProgressProps };
