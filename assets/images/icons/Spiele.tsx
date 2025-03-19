import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath } from "react-native-svg"
const Spiele = ({ color, ...props }: { color: string } & SvgProps) => (
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
        d="M25 3.125H0v18.75h25V3.125ZM1.042 20.833h10.937V17.16a4.688 4.688 0 0 1 0-9.318V4.167H1.042v3.125h4.166v10.416H1.042v3.125ZM11.979 8.891a3.647 3.647 0 0 0 0 7.218V8.891Zm1.042 7.218V8.891a3.647 3.647 0 0 1 0 7.218Zm0 1.05a4.688 4.688 0 0 0 0-9.318V4.167h10.937v3.125h-4.166v10.416h4.166v3.125H13.021V17.16ZM1.04 8.333v8.334h3.126V8.333H1.042Zm19.792 8.334h3.125V8.333h-3.125v8.334Z"
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
export default Spiele
