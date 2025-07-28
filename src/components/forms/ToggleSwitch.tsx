interface ToggleSwitchProps {
  checked: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  labelLeft?: string;
  labelRight?: string;
  name: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  labelLeft,
  labelRight,
  name,
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      {labelLeft && <span>{labelLeft}</span>}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="switch"
      />
      {labelRight && <span>{labelRight}</span>}
    </label>
  );
};

export default ToggleSwitch;
