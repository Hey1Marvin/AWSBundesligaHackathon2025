import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath} from "react-native-svg"
const Videos = ({ color, ...props }: { color: string } & SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        fillRule="evenodd"
        d="m4.438 22.54 18.208-10.81L4.438.918V22.54Zm16.169-10.81L5.48 20.71V2.749l15.127 8.982Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h25v25H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Videos
