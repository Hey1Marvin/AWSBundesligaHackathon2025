import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath, Circle} from "react-native-svg"
const Copy =  ({ width, height, color, ...props }: { color: string } & SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path fill='none' fillRule="evenodd" d="M0 0h24v24H0z" />
    <Path d="M0 0h24v24H0z" />
    <Path
      fill={color}
      d="M14.264 5.711H3.632a1.5 1.5 0 0 0-1.5 1.5v13.79a1.5 1.5 0 0 0 1.5 1.5h10.632a1.5 1.5 0 0 0 1.5-1.5V7.21a1.5 1.5 0 0 0-1.5-1.5Zm-10.632 1h10.632a.5.5 0 0 1 .5.5v13.79a.5.5 0 0 1-.5.5H3.632a.5.5 0 0 1-.5-.5V7.21a.5.5 0 0 1 .5-.5ZM8.894 1.5A1.5 1.5 0 0 1 7.401.144L7.394 0v-3h1v3a.5.5 0 0 0 .41.492l.09.008h10.632a.5.5 0 0 0 .492-.41l.008-.09v-13.79a.5.5 0 0 0-.41-.491l-.09-.008h-4v-1h4a1.5 1.5 0 0 1 1.493 1.355l.007.144V0a1.5 1.5 0 0 1-1.356 1.493l-.144.007H8.894Z"
    />
  </Svg>
)
export default Copy
