import React from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../../questions";

const Summary = ({ userAnswers }) => {
    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0]
    );

    const skippedAnswersShare = Math.round(
        (skippedAnswers.length / userAnswers.length) * 100
    );
    const correctAnswersShare = Math.round(
        (correctAnswers.length / userAnswers.length) * 100
    );
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Trophy Icon" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersShare}%</span>
                    <p className="text">skipped</p>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <p className="text">answered correctly</p>
                </p>
                <p>
                    <span className="number">{wrongAnswersShare}%</span>
                    <p className="text">answered incorrectly</p>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClasses = "user-answer";
                    if (answer === null) {
                        cssClasses += " skipped";
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClasses += " correct";
                    } else {
                        cssClasses += " wrong";
                    }

                    return (
                        <li key={answer}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <div className={cssClasses}>
                                {answer ?? "Skipped"}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default Summary;
