import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath} from "react-native-svg"
const Statistiken = ({ color, ...props }: { color: string } & SvgProps) => (
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
        d="M25 1.563h-6.25v21.875H25V1.563Zm-1.042 1.041v19.792h-4.166V2.604h4.166Zm-8.333 7.292h-6.25v13.541h6.25V9.896Zm-1.042 1.041v11.459h-4.166V10.937h4.166ZM6.25 15.104H0v8.334h6.25v-8.334Zm-1.042 1.042v6.25H1.042v-6.25h4.166Z"
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
export default Statistiken
