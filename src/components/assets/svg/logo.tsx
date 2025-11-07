export interface IconProps {
  width?: string;
  height?: string;
  className?: string;
}

const LogoIcon: React.FC<Partial<IconProps>> = ({
  width,
  height,
  className,
}) => {
  return (
    <div className={className ?? "w-5 h-5"}>
      <img src="/logo_trim.svg" width={width} height={height} alt="logo" />
    </div>
  );
};

export default LogoIcon;
