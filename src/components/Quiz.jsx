import React, { useCallback, useRef, useState } from "react";
import QUESTIONS from "../../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Question from "./Question";

const Quiz = () => {
    const [answerState, setAnswerState] = useState("");
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex =
        answerState === "" ? userAnswers.length : userAnswers.length - 1;

    const quizCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(
        (selectedAnswer) => {
            setAnswerState("answered");
            setUserAnswers((prevUserAnswers) => {
                return [...prevUserAnswers, selectedAnswer];
            });
            setTimeout(() => {
                if (
                    selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]
                ) {
                    setAnswerState("correct");
                } else {
                    setAnswerState("wrong");
                }

                setTimeout(() => {
                    setAnswerState("");
                }, 2000);
            }, 1000);
        },
        [activeQuestionIndex]
    );

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    );

    if (quizCompleted) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy Icon" />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectAnswer}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
};

export default Quiz;
