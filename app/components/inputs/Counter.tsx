"use client";

import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

interface RoundedIconProps {
  icon: IconType;
  onClick: () => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <RoundedIcon onClick={onReduce} icon={AiOutlineMinus} />
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <RoundedIcon onClick={onAdd} icon={AiOutlinePlus} />
      </div>
    </div>
  );
};

const RoundedIcon: React.FC<RoundedIconProps> = ({ onClick, icon: Icon }) => (
  <div
    onClick={onClick}
    className="
    w-10
    h-10
    rounded-full
    border-[1px]
    border-neutral-400
    flex
    items-center 
    justify-center 
    text-neutral-600 
    cursor-pointer 
    hover:opacity-80
    transition
  "
  >
    <Icon />
  </div>
);

export default Counter;
