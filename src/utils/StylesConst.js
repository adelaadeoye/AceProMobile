import { windowWidth, windowHeight } from 'sm/utils/Dimensions';

const localWidth = windowWidth >= windowHeight ? windowHeight : windowWidth
const localHeight = windowWidth < windowHeight ? windowHeight : windowWidth

const widthCoef = ((localWidth > 375) ? 375 : localWidth)/ 375
const heightCoef = ((localHeight > 812) ? 812 : localHeight)/ 812

export const scale = (size) => widthCoef * size
export const v_scale = (size) => heightCoef * size
