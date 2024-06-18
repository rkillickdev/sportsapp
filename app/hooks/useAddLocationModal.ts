import { create } from "zustand";

interface AddLocationModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddLocationModal = create<AddLocationModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useAddLocationModal;