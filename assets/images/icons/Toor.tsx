import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath, Circle} from "react-native-svg"
const Toor=  ({ color, ...props }: { color: string } & SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M0 0h16v16H0z" />
      <Path fill="none" d="M15.999 0H0v16h15.999V0Z" />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M1 2.873h13.999a1 1 0 0 1 1 1v8.254a1 1 0 0 1-1.447.894l-1.632-.815H3.078l-1.63.815a1 1 0 0 1-.883.006l-.09-.05a1 1 0 0 1-.475-.85V3.873a1 1 0 0 1 1-1Zm2.138 2.666h9.723l2-2H1.138l2 2Zm10.194 4.334V6.01l2-2v8.116a.333.333 0 0 1-.482.298l-1.518-.758V9.873Zm-.666-.334V8.206h-1.334v1.333h1.334Zm-1.334.667h1.334v1.333h-1.334v-1.333Zm-.666-.667V8.206H9.333v1.333h1.333Zm-1.333.667h1.333v1.333H9.333v-1.333Zm-.667-.667V8.206H7.333v1.333h1.333Zm-1.333.667h1.333v1.333H7.333v-1.333Zm-.667-.667V8.206H5.333v1.333h1.333Zm-1.333.667h1.333v1.333H5.333v-1.333Zm-.667-.667V8.206H3.333v1.333h1.333Zm-1.333.667h1.333v1.333H3.333v-1.333Zm-.667-.333V6.01l-2-2v8.116a.333.333 0 0 0 .484.297l1.516-.757V9.873Zm2-3.667v1.333H3.333V6.206h1.333Zm2 0v1.333H5.333V6.206h1.333Zm2 0v1.333H7.333V6.206h1.333Zm2 0v1.333H9.333V6.206h1.333Zm2 0v1.333h-1.334V6.206h1.334Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Toor
