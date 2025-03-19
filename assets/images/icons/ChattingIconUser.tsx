import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath, Circle} from "react-native-svg"
const ChattingIconUser =  ({ color, ...props }: { color: string } & SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={10} r={9.5} fill="#D20515" stroke="#fff" />
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M4 4h12v12H4z" />
      <Path fill="#D20515" d="M16 4H4v12h12V4Z" />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M4 10a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm11.5 0a5.5 5.5 0 1 0-9.485 3.79c.83-.467 1.707-.842 2.605-1.114.211-.078.275-.81.066-1.042-.604-.664-.865-1.323-.864-2.527A2.156 2.156 0 0 1 9.893 6.75h.244a2.156 2.156 0 0 1 2.083 2.333c0 1.23-.26 1.887-.865 2.551-.21.231-.145.964.052 1.037.902.274 1.771.644 2.593 1.104A5.48 5.48 0 0 0 15.5 10Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M4 4h12v12H4z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ChattingIconUser
