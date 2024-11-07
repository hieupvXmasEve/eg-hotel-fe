import { create } from "zustand";
import { RoomDetail } from "../data/get-room-detail";

interface RoomDetailState {
  roomDetail: RoomDetail | null;
  dateFrom: string | null;
  dateTo: string | null;
  setRoomDetail: (room: RoomDetail) => void;
  setDates: (dateFrom: string, dateTo: string) => void;
  reset: () => void;
}

const initialState = {
  roomDetail: null,
  dateFrom: null,
  dateTo: null,
};

export const useRoomDetail = create<RoomDetailState>()((set) => ({
  ...initialState,
  setRoomDetail: (room) => set({ roomDetail: room }),
  setDates: (dateFrom, dateTo) => set({ dateFrom, dateTo }),
  reset: () => set(initialState),
}));
