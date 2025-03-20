import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath } from "react-native-svg"
const Speaker = ({ color, 
  width = 25, 
  height = 25, 
  ...props  }: { color: string } & SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M13.5 3.5H9.807l-5.25 4.75H.5v7.5h4.058l5.25 4.75H13.5v-17Zm4.978.146a.5.5 0 0 1 .707 0 12 12 0 0 1 0 16.972.5.5 0 0 1-.706-.708 11 11 0 0 0 0-15.556.5.5 0 0 1 0-.708ZM12.5 4.5v15h-2.308l-5.25-4.75H1.5v-5.5h3.443L10.19 4.5H12.5Zm3.854 1.973a.5.5 0 1 0-.707.708 7 7 0 0 1 0 9.9.5.5 0 0 0 .707.707 8 8 0 0 0 0-11.315Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Speaker
