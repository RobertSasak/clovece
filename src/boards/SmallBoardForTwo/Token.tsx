import React from 'react';
import { Rect } from 'react-native-svg';

interface TokenProps {
  x: number;
  y: number;
  size: number;
  color: string;
}

export const Token: React.FC<TokenProps> = (props) => {
  return (
    <Rect
      x={props.x - (props.size / 2)}
      y={props.y - (props.size / 2)}
      width={props.size}
      height={props.size}
      stroke="black"
      strokeWidth="2"
      fill={props.color}
    />
  );
};