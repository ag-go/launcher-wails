import mitt, {Emitter} from 'mitt'
import type {ItemInfo} from './types'

type Events = {
    selectItem: ItemInfo
    rerenderList: Boolean
    selectCurrentItem: Boolean
}

const emitter: Emitter<Events> = mitt<Events>()

const useCommandEvent = () => {
    return {
        emitter
    }
}

export {useCommandEvent}
