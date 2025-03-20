// CopyIcon.tsx
import * as React from "react";
import { Svg, Path } from "react-native-svg";

const Copy = ({ width = 24, height = 24, color = "#000" }) => (
  <Svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 24"  // Unverändert lassen!
    fill="none"
  >
    <Path
      fill={color}
      // Optimierte Pfaddaten für bessere Skalierung
      d="M15 1H4a2 2 0 0 0-2 2v14h2V3h11V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h10v14z"
    />
  </Svg>
);

export default Copy;