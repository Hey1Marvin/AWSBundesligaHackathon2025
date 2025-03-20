import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath, Circle} from "react-native-svg"
const Share =  ({ color, width = 12, height = 12, ...props }: { color: string } & SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="none" d="M12 0H0v12h12V0Z" />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M7.25 2.5a2.25 2.25 0 1 1 .152.816L4.411 4.812c.215.344.339.752.339 1.188 0 .321-.067.626-.188.903l2.979 1.49A2.25 2.25 0 0 1 11.75 9.5a2.25 2.25 0 1 1-4.406-.647L4.31 7.336a2.25 2.25 0 1 1-.217-2.925l3.18-1.59A2.266 2.266 0 0 1 7.25 2.5ZM4.114 6.679l-.002-.001-.113.226A1.75 1.75 0 0 1 .75 6a1.75 1.75 0 1 1 3.364.679ZM11.25 2.5a1.75 1.75 0 1 0-3.5 0 1.75 1.75 0 0 0 3.5 0ZM9.5 7.75a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Share
