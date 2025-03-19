import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath} from "react-native-svg"

const AIChat = ({ color, ...props }: { color: string } & SvgProps) => (
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
        d="M0 0h17.708v10.938H25v10.416h-2.083V25l-4.862-3.646h-3.472v-6.77H9.036l-5.911 4.729v-4.73H0V0Zm14.583 13.542v-2.604h2.084V1.041H1.042v12.5h3.125v3.603l4.504-3.603h5.912Zm-.716-6.25a5.013 5.013 0 1 0-10.026 0 5.013 5.013 0 0 0 10.026 0ZM8.854 3.32c.233 0 .46.02.682.059l-.614 1.5-1.862.603-1.124-.884A3.96 3.96 0 0 1 8.854 3.32Zm2.178 3.455L9.904 5.228l.63-1.536a3.975 3.975 0 0 1 2.258 3.08l-1.76.003ZM5.335 5.45a3.954 3.954 0 0 0-.452 1.842c0 .665.164 1.293.453 1.844l1.1-.859V6.316L5.334 5.45ZM9.114 8.68l1.009-1.385L9.115 5.91l-1.638.53v1.711l1.637.53Zm1.419 2.211a3.975 3.975 0 0 0 2.258-3.078l-1.758.003-1.129 1.548.629 1.527Zm-4.595-.905 1.12-.875 1.864.603.613 1.49a3.96 3.96 0 0 1-3.597-1.218Zm9.687 1.992v8.334h2.778l3.472 2.604v-2.605h2.083V11.98h-8.333Zm4.688 1.042v4.166H19.27v-4.166h1.041Zm0 6.25v-1.042H19.27v1.042h1.041Z"
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
export default AIChat
