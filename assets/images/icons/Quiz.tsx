import * as React from "react"
import { SvgProps, Svg, G, Path, Defs, ClipPath} from "react-native-svg"
const Quiz = ({ color, 
  width = 21, 
  height = 21, 
  ...props  }: { color: string } & SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path fill="#none" fillRule="evenodd" d="M0 0h24v24H0z" />
    <Path d="M0 0h24v24H0z" />
    <Path
      fill="#ffffff"
      fillRule="evenodd"
      d="M3.667 6.582a6.253 6.253 0 0 0 4.577 6.024l-.004.004 8.635 7.601 1.388-.925a3.5 3.5 0 0 1-6.449 2.51l-.449.26c-.286-.448-.39-.608-.39-.607l.387.608-.414.24.11.18a4.5 4.5 0 0 0 8.117-3.662l-.051-.103 1.423-.949-4.494-9.986A6.25 6.25 0 1 0 3.667 6.582ZM15.592 17.75l1.366 1.202 2.33-1.552-.69-1.53-3.006 1.88Zm-5.587-4.919a6.251 6.251 0 0 0 5.59-3.634l2.59 5.753-3.376 2.11-4.804-4.229Zm5.162-6.249a5.3 5.3 0 0 1-.044.683l-.289-.677.29-.68a5.3 5.3 0 0 1 .043.674Zm-1.207-.494.727-1.702a5.264 5.264 0 0 0-1.174-1.63l-1.913.17-.515 1.055 1.536 2.107h1.34Zm-.46 4.33-1.898-.167-.517-1.055 1.536-2.107h1.34l.723 1.695a5.264 5.264 0 0 1-1.183 1.635Zm-1.273-8.552-.785.069-.6-.522c.488.087.953.241 1.385.453Zm-.021 9.442a5.21 5.21 0 0 1-1.345.44l.583-.507.762.067Zm-1.894-2.751 1.436-1.969-1.435-1.969-2.325.754v2.432l2.324.752Zm-2.705.176-.656.588.428 1.858c.577.319 1.22.533 1.904.615l1.376-1.195-.511-1.044-2.54-.822Zm2.54-5.111.51-1.044L9.27 1.372a5.215 5.215 0 0 0-1.887.612L6.95 3.857l.657.588 2.54-.823ZM4.76 5.593l1.577-.942.65.582v2.713l-.649.581-1.574-.94a5.273 5.273 0 0 1-.004-1.994Zm.52-1.476c.23-.432.52-.828.856-1.177l-.178.772-.677.405Zm.853 6.104-.174-.756-.668-.398c.228.423.512.81.842 1.154Z"
    />
  </Svg>
)
export default Quiz