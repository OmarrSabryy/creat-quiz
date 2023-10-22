import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, NewQuiz, UpdateQuiz } from "./scenes";

function App() {
  return (
    <main className="App bg-light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-quiz" element={<NewQuiz />} />
          <Route path="/update-quiz/:quizId" element={<UpdateQuiz />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
