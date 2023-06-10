import { reactive, toRefs, computed } from 'vue'

type FilteredItem = {
    count: number
    items: Map<string, any>
    groups: Set<string>
}

type State = {
    // Event State
    selectedNode: string
    selectedGroup: string
    // Input State
    search: string
    dataValue: string
    filtered: FilteredItem
}

const state = reactive<State>({
    selectedNode: '',
    selectedGroup: '',
    search: '',
    dataValue: '',
    filtered: {
        count: 0,
        items: new Map(),
        groups: new Set()
    }
})

const useCommandState = () => {
    const isSearching = computed(() => state.search !== '')
    return {
        isSearching,
        ...toRefs(state)
    }
}

export { useCommandState }
