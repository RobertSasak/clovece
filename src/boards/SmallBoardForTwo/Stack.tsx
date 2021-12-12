import React from 'react';
import { G, Rect, Text } from 'react-native-svg';

interface StackProps {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  color: string;
}

export const Stack: React.FC<StackProps> = (props) => {
  return (
    <G>
      <Rect
        x={props.x - (props.width / 2)}
        y={props.y}
        width={props.width}
        height={props.height}
        stroke="black"
        strokeWidth="2"
        fill={props.color}
      />
      <Text x={props.x} y={props.y + 40} textAnchor="middle"
        stroke="black" fill="black" fontSize="40">
        {props.title}
      </Text>
    </G>
  );
};
