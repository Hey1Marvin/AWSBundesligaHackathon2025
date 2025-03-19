import * as React from "react"
import { SvgProps, Svg } from "react-native-svg"
const VideosLight = (props:SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#64686C"
        fillRule="evenodd"
        d="m4.438 22.54 18.208-10.81L4.438.918V22.54Zm16.169-10.81L5.48 20.71V2.749l15.127 8.982Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </Svg>
)
export default VideosLight
