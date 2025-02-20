import { NewArea } from "@/types/area";
import { createSlice } from "@reduxjs/toolkit";

interface FormState {
  groupId: string;
  forms: NewArea[];
  isLoading: boolean;
  isFetching: boolean;
}

const initialState: FormState = {
  groupId: localStorage.getItem("groupId") || Date.now().toString(),
  forms: [],
  isLoading: false,
  isFetching: false,
};

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    addForm: (state, action) => {
      state.forms.unshift(action.payload);
    },
    deleteForm: (state, action) => {
      state.forms = state.forms.filter(
        (item) => item.formId !== action.payload
      );
    },
    initializeForms: (state, action) => {
      state.forms = action.payload;
    },
    clearForms: (state) => {
      state.forms = [];
    },
  },
});

export default formSlice.reducer;
export const {
  addForm,
  deleteForm,
  initializeForms,
  setLoading,
  setIsFetching,
  clearForms,
} = formSlice.actions;
