interface State {
    isModalOpen: boolean;
}

let state = $state({ isModalOpen: false });

export function getState() {
    function updateState(newState: State) {
        state = newState;
    }

    function toggleModal() {
        updateState({ isModalOpen: !state.isModalOpen });
    }

    return {
        get state() {
            return state;
        },
        updateState,
        toggleModal
    }
}