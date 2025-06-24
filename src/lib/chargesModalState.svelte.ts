import type { Tables } from "./database.types";

interface State {
    isModalOpen: boolean;
    selectedCharge: Tables<'charges'> | null;
}

let state: State = $state({ isModalOpen: false, selectedCharge: null });

export function getState() {
    function updateState(newState: State) {
        state = newState;
    }

    function toggleModal() {
        updateState({ ...state, isModalOpen: !state.isModalOpen });
    }

    return {
        get state() {
            return state;
        },
        updateState,
        toggleModal
    }
}