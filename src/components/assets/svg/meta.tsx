export interface IconProps {
  width?: string;
  height?: string;
  className?: string;
}

const MetaIcon: React.FC<Partial<IconProps>> = ({
  width,
  height,
  className,
}) => {
  return (
    <div
      className={`pointer-events-none select-none ${className ?? "w-5 h-5"}`}
    >
      <img src="/meta_white.svg" width={width} height={height} alt="logo" />
    </div>
  );
};

export default MetaIcon;
