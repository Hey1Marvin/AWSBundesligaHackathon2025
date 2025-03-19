/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000000';
const tintColorDark = '#fff';
const bundesligaRot = '#D20515';

export const Colors = {
  light: {
    background: '#E9EBED',
    tint: tintColorLight,
    eleColor: '#fff',
    navbar: '#fff',

    mainRed: bundesligaRot,
    answerBack: '#C9CCCF',
    answerTint: '#000000',
    questionTint: '#fff',
    weakGrey: '#C9CCCF',
    strongGrey: '#64686C',
    icon: tintColorLight,

    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    background: '#000E14',
    tint: tintColorDark,
    eleColor: '#191E24',
    navbar: '#34383C',

    mainRed: bundesligaRot,
    answerBack: '#191E24',
    answerTint: '#fff',
    questionTint: '#fff',
    weakGrey: '#C9CCCF',
    strongGrey: '#64686C',
    icon: tintColorDark,

    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
