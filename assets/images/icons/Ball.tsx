import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath, Ellipse} from "react-native-svg"
const Ball = ({ color, width, height, ...props }: { color: string } & SvgProps) => (
  <Svg
    width={width}  // Größe jetzt dynamisch
    height={height}
    viewBox="0 0 24 24"  // WICHTIG: Behält das ursprüngliche Koordinatensystem bei
    fill="none"
    {...props}
  >
    {/* ClipPath entfernen oder anpassen */}
    <G>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12C5.717 24 .561 19.17.043 13.021A12.16 12.16 0 0 1 0 12ZM12 1c1.05 0 2.066.147 3.029.422L12.013 2.71 8.988 1.418A11.007 11.007 0 0 1 12 1ZM1.058 13.134a10.93 10.93 0 0 0 1.419 4.375l4.249.979L8.29 16.74 6.49 11.184 3.867 9.902l-2.81 3.232ZM4.214 8.96l2.635 1.287 4.664-3.398V3.584l-3.91-1.67a11.028 11.028 0 0 0-3.771 2.718l.382 4.327Zm15.977-4.301-.38 4.298-2.634 1.29-4.664-3.398V3.584L16.41 1.92a11.029 11.029 0 0 1 3.781 2.738ZM2.93 5.776l.294 3.341-2.218 2.553a10.944 10.944 0 0 1 1.924-5.894Zm18.164.032a10.943 10.943 0 0 1 1.901 5.83l-2.193-2.524.292-3.306Zm-4.555 5.211-4.525-3.298-4.526 3.297 1.731 5.34h5.592l1.728-5.339Zm-.8 5.72 1.564 1.746 4.218-.971a10.93 10.93 0 0 0 1.425-4.408L20.16 9.9l-2.623 1.285-1.798 5.556Zm-6.031 6.022L7.519 19.1l1.56-1.742h5.872l1.557 1.74-2.18 3.654a11.044 11.044 0 0 1-4.621.007Zm-1.403-.397a11.025 11.025 0 0 1-5.011-3.641l3.287.757 1.724 2.884Zm12.4-3.636-3.258.75-1.714 2.873a11.025 11.025 0 0 0 4.971-3.623Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
)
export default Ball
