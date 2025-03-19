import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath } from "react-native-svg"

const Speaker = ({ color, width = 16, height = 16, ...props }: { color: string } & SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="transparent" d="M0 0h16v16H0z" />
      <Path
        fill={color}
        d="M8.667 2 4 5.333H2v5.334h2l4.667 3.333V2Z"
      />
      <Path
        fill={color}
        d="M11.333 5.333a4 4 0 0 1 0 5.334M13.333 3.333a6.667 6.667 0 0 1 0 9.334M9.333 7.333a1.333 1.333 0 1 1 0 2.667"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default Speaker