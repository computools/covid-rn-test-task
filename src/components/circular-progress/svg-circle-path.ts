import {polarToCartesian} from './polar-to-cartesian';

const halfTurn = 180;
const almostOne = 0.9999;
const zero = 0;

export const buildCirclePath = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle * almostOne);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= halfTurn ? '0' : '1';
  const d = ['M', start.x, start.y, 'A', radius, radius, zero, largeArcFlag, zero, end.x, end.y];
  return d.join(' ');
};
