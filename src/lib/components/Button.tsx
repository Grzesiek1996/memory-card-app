type ButtonProps = {
  label: string;
  onClick: VoidFunction;
  className?: string;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {label}
    </button>
  );
};
