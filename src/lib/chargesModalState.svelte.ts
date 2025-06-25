import type { Tables } from "./database.types";

interface State {
    isModalOpen: boolean;
    selectedCharge: Tables<'charges'> | null;
}

// Export the state directly
export let chargeState: State = $state({
    isModalOpen: false,
    selectedCharge: null
});

// Export helper functions
export function updateState(newState: State) {
    chargeState.isModalOpen = newState.isModalOpen;
    chargeState.selectedCharge = newState.selectedCharge;
}

export function toggleModal() {
    chargeState.isModalOpen = !chargeState.isModalOpen;
}

export function setSelectedCharge(charge: Tables<'charges'> | null) {
    chargeState.selectedCharge = charge;
}