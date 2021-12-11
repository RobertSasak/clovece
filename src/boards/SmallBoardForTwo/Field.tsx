import React from 'react';
import { Circle } from 'react-native-svg';

interface FieldProps {
  x: number;
  y: number;
  size: number;
  color: string;
}

export const Field: React.FC<FieldProps> = (props) => {
  return (
    <Circle
      cx={props.x}
      cy={props.y}
      r={props.size / 2}
      stroke="black"
      strokeWidth="2"
      fill={props.color}
    />
  );
};