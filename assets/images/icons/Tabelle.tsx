import * as React from "react"
import { SvgProps, Svg, G, Path, Defs,ClipPath } from "react-native-svg"
const Tabelle = ({ color, ...props }: { color: string } & SvgProps) => (
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
        d="M1.98 1.154a1.114 1.114 0 0 1 1.09-.09.968.968 0 0 1 .568.739l.008.12V5.77h.525c.287 0 .52.215.52.481a.493.493 0 0 1-.427.473l-.093.008H2.087c-.287 0-.52-.215-.52-.481 0-.236.184-.432.427-.473l.093-.008h.517V1.923l-1.25.865a.55.55 0 0 1-.729-.096.453.453 0 0 1 .034-.615l.07-.058 1.25-.865Zm7.395 3.654v-.962H25v.962H9.375ZM2.659 9.615c1.121.003 2.029.843 2.029 1.879-.001.412-.159.81-.444 1.124l-.112.113-1.834 1.692h1.869c.255 0 .468.17.512.394l.008.087a.493.493 0 0 1-.427.473l-.093.008H1.042c-.433 0-.665-.451-.427-.758l.058-.063 2.722-2.512c.16-.149.25-.35.25-.559 0-.505-.442-.915-.988-.916-.385 0-.73.204-.894.518l-.048.108c-.091.252-.386.388-.66.304-.272-.084-.42-.356-.328-.608.277-.767 1.055-1.284 1.932-1.284ZM9.375 12.5v-.961H25v.961H9.375Zm-6.613 9.126a.477.477 0 0 1 0-.944l.215-.015c.381-.048.675-.35.675-.715s-.294-.667-.675-.715l-.106-.006h-.788a.511.511 0 0 0-.512.394l-.008.087c0 .265-.234.48-.521.48-.288 0-.521-.215-.521-.48 0-.75.62-1.366 1.412-1.436l.15-.007h.788c1.007 0 1.823.754 1.823 1.683 0 .465-.204.885-.534 1.19l-.015.012.015.012c.297.274.492.642.528 1.052l.006.138c0 .883-.737 1.607-1.674 1.677l-.15.005h-.787c-.863 0-1.562-.645-1.562-1.442 0-.265.233-.48.52-.48.256 0 .469.17.513.394l.008.086c0 .236.185.433.428.473l.093.008h.788c.431 0 .781-.323.781-.721 0-.365-.294-.667-.675-.715l-.215-.015Zm6.613-1.434v-.961H25v.961H9.375Z"
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
export default Tabelle
