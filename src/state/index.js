import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizes: [],
};

export const quizesSlice = createSlice({
  name: "quizes",
  initialState,
  reducers: {
    addNewQuiz: (state, action) => {
      let updatedQuizes = [];
      updatedQuizes.push(action.payload.quiz);
      state.quizes = state.quizes.concat(updatedQuizes);
    },
    updateQuizes: (state, action) => {
      let updatedQuizes = state.quizes.map((quiz) => {
        if (quiz.id === action.payload.quiz.id) return action.payload.quiz;
        return quiz;
      });
      state.quizes = updatedQuizes;
    },
  },
});

export const { addNewQuiz, updateQuizes } = quizesSlice.actions;
export default quizesSlice.reducer;
