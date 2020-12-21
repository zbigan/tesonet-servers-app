const stateReducer = (state, action) => {
    switch(action.type) {
        case 'SET_SERVERS': {
            return {
                ...state,
                servers: action.value,
                sortedBy: '',
                isSortedAscending: false
            }
        }
        case 'SORT_BY_NAME': {
            const serversCopy = JSON.parse(JSON.stringify(state.servers));

            if (state.sortedBy === 'name') {
                return {
                    ...state,
                    isSortedAscending: !state.isSortedAscending,
                    servers: serversCopy.reverse()
                }
            } else {
                return {
                    ...state,
                    sortedBy: 'name',
                    servers: serversCopy.sort((a, b) => a.name < b.name ? -1 : 1),
                    isSortedAscending: false
                }
            }
        }
        case 'SORT_BY_DISTANCE': {
            const serversCopy = JSON.parse(JSON.stringify(state.servers));

            if (state.sortedBy === 'distance') {
                return {
                    ...state,
                    isSortedAscending: !state.isSortedAscending,
                    servers: serversCopy.reverse()
                }
            } else {
                return {
                    ...state,
                    servers: serversCopy.sort((a, b) => a.distance < b.distance ? -1 : 1),
                    sortedBy: 'distance',
                    isSortedAscending: false
                }
            }
        }
        default: return state
    }
}


export { stateReducer };
