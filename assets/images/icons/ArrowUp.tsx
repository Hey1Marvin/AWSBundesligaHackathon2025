import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath} from "react-native-svg"
const ArrowUp = ({ color, 
  width = 21, 
  height = 21, 
  ...props  }: { color: string } & SvgProps) => (
  <Svg
  width={width}
  height={height}
  viewBox="0 0 21 21"
    fill="none"
    {...props}
  >
    <G >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m16.315 9.934.619-.618L10.5 2.88 4.065 9.316l.619.618 5.378-5.378v13.82h.875V4.555l5.378 5.378Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h21v21H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ArrowUp
