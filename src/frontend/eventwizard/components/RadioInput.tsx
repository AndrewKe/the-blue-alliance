import React, { ChangeEventHandler } from "react";

const RadioInput = ({
  onChange,
  options,
  value,
  labels,
}: {
  options: any[];
  value: any;
  labels?: any[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      {options.map((option, i) => {
        return (
          <div className="radio">
            <label>
              <input
                type="radio"
                value={option}
                onChange={onChange}
                checked={option === value}
              />
              {labels?.[i] ?? option}
            </label>
          </div>
        );
      })}
    </>
  );
};
export default RadioInput;
