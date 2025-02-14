import { Dimensions } from 'react-native'
import { Platform } from 'react-native'
import { getDeviceType } from 'react-native-device-info'
import Toast from 'react-native-toast-message'
import { Colors } from '../constants'

let deviceType = getDeviceType()
const { width, height } = Dimensions.get('window')
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const hs = (size: number) => (((width / guidelineBaseWidth) * size * (Platform.OS == 'ios' ? 1 : 0.8)) * (deviceType === 'Tablet' ? 0.5 : 1))
const vs = (size: number) => (((height / guidelineBaseHeight) * size * (Platform.OS == 'ios' ? 1 : 0.8)) * (deviceType === 'Tablet' ? 0.5 : 1))
const ms = (size: number, factor = 0.65) => (size + (hs(size) - size) * factor * (Platform.OS == 'ios' ? 1 : 0.8))


const toast = (type: string, content: {title: string, description?: string}) => {   
    Toast.show({
        type: type,
        text1: content.title,
        text1Style:{
            color:Colors.es_black,
        },
    })
}

export { hs, vs, ms, width, deviceType, toast}