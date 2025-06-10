import type { FC } from "react";

interface RadioGroupProps {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const RadioGroup: FC<RadioGroupProps> = ({ name, options, selectedValue, onChange, className }) => (
  <div className="flex flex-col gap-2">
    {options.map((option) => (
      <label key={option.value} className="inline-flex items-center">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
          className={className}
        />
        {option.label}
      </label>
    ))}
  </div>
);

export default RadioGroup;
