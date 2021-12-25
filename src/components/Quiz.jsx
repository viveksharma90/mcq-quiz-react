import React from "react";
import { Navbar, Container } from "react-bootstrap";

import Content from "./Content";
import Results from "./Results.jsx";
import Questions from "../questions";

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredQuestions: Questions,
      currentAnswers: [],
      results: {
        correct: 0,
        total: 0,
        passed: false,
      },
      isAllAnswered: false,
      isSubmitted: false,
    };
  }

  handleSearch(e) {
    const filteredQuestions = Questions.filter((question) => {
      var regex = new RegExp("i");
      return regex.test(question.label);
    });

    this.setState({
      filteredQuestions: filteredQuestions,
    });
  }

  handleAnswer(e) {
    const currentAnswers = this.recordAnswer.apply(
      this,
      e.target.value.split("_")
    );

    const isAllAnswered = this.checkIfAllAnswered();

    this.setState({
      currentAnswers: currentAnswers,
      isAllAnswered: isAllAnswered,
    });
  }

  handleSubmit() {
    this.checkAnswers();
  }

  render() {
    const questions = this.state.filteredQuestions;
    const currentAnswers = this.state.currentAnswers;
    const isAllAnswered = this.state.isAllAnswered;
    const isSubmitted = this.state.isSubmitted;
    const results = this.state.results;
    let resultsElem = "";

    if (isSubmitted) {
      resultsElem = <Results results={results} />;
    }

    return (
      <Container fluid className="quiz-container">
        <Navbar bg="dark" variant="dark" sticky="top">
          <Container className="nav-container">
            <Navbar.Brand href="#home">React Quiz</Navbar.Brand>
          </Container>
        </Navbar>
        <Container className="content-container">
          {resultsElem}
          <Content
            questions={questions}
            currentAnswers={currentAnswers}
            onAnswer={(e) => this.handleAnswer(e)}
            onSubmit={() => this.checkAnswers()}
            isAllAnswered={isAllAnswered}
            isSubmitted={isSubmitted}
          />
        </Container>
      </Container>
    );
  }

  /**
   * Record each answer as it happens
   */
  recordAnswer(questionNumber, answerNumber) {
    const currentAnswers = this.state.currentAnswers;

    const data = {
      answer: parseInt(answerNumber),
    };

    currentAnswers["question_" + questionNumber] = data;

    return currentAnswers;
  }

  /**
   * Check if all has been answered
   */
  checkIfAllAnswered() {
    const currentAnswers = this.state.currentAnswers;

    const questions = Object.keys(Questions).length;
    const answers = Object.keys(currentAnswers).length;

    return answers === questions;
  }

  /**
   * Check if answers are correct
   */
  checkAnswers() {
    const currentAnswers = this.state.currentAnswers;

    let results = {
      correct: 0,
      total: Object.keys(currentAnswers).length,
      passed: false,
    };

    for (const key in currentAnswers) {
      const qNumber = key.split("_")[1];
      const isCorrect =
        Questions[qNumber].correctOption === currentAnswers[key].answer;

      currentAnswers[key].isCorrect = isCorrect;
      results.correct = isCorrect ? ++results.correct : results.correct;
    }

    results.passed = results.correct / results.total >= 0.6;

    this.setState({
      currentAnswers: currentAnswers,
      isSubmitted: true,
      results: results,
    });
  }
}

export default Quiz;
