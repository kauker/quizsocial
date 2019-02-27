import React, { Component } from 'react';
import Question from './Question/';
import Activity from './Activity/';

// import firebaseApp from '../../firebase.js';
import firebase from 'firebase/app';
class Quiz extends Component {

    state = {
        questions: [],
        answers: [],
        currentIndex: 0,
        userAnswer: null,
        quizCompleted: false,
        logs: []
    }

    componentDidMount() {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple&category=17&difficulty=easy')
        .then(res => res.json())
        .then(data => {
            const questions = data.results
            const currQuestion = questions[0]
            const answers = shuffle([currQuestion.correct_answer, ...currQuestion.incorrect_answers]);
            this.setState({questions, answers})
        
        })

        // Updating the `someData` local state attribute when the Firebase Realtime Database data
        // under the '/someData' path changes.
        this.firebaseRef = firebase.database().ref('logs');
        this.firebaseRefRecent = firebase.database().ref('logs').limitToLast(7);
        this.firebaseCallback = this.firebaseRefRecent.on('value', (snap) => {      
            this.setState({ logs: snap.val() });
        });
    }

    componentWillUnmount() {
        // Un-register the listener on '/logs'.
        this.firebaseRefRecent.off('value', this.firebaseCallback);
      }

    handleClickAnswer = (userAnswer) => {
        const { questions, currentIndex} = this.state
        this.setState({userAnswer})
        const userName = this.props.user.displayName.split(' ')[0]
        const type = userAnswer === questions[currentIndex].correct_answer ? 'correct_answer' : 'wrong_answer'
        this.firebaseRef.push({
            user: userName,
            type,
            timeStamp: {'.sv': 'timestamp'}
          });
    }

    handleContinue = () => {
        let {currentIndex, questions} = this.state
        if (++currentIndex < questions.length) {
            const currQuestion = questions[currentIndex]
            const answers = shuffle([currQuestion.correct_answer, ...currQuestion.incorrect_answers]);
            this.setState({userAnswer: null, currentIndex: currentIndex, answers})
        } else if (currentIndex === questions.length) {
            this.setState({quizCompleted: true})
        }
    }
    render() {
        const {questions, currentIndex, userAnswer, quizCompleted, logs, answers} = this.state
        const currQuestion = questions[currentIndex] || {}
        
        return (
            <section className="section">
            <div className="container">
                <div class="columns">
                    <div class="column">
                    {questions.length ? 
                        <Question question={currQuestion}
                                    answers={answers}
                                    currentIndex={currentIndex}
                                    userAnswer={userAnswer}
                                    handleClickAnswer={this.handleClickAnswer} />
                    : 'Loading...'}
                    {!!userAnswer && !quizCompleted ? 
                        <button className="button" onClick={this.handleContinue}>Continue</button>
                    : null}
                    {quizCompleted ? <div className="card"><div class="notification is-primary">Quiz completed!</div></div>: null}
                    </div>
                    
                    <div class="column is-one-quarter">
                        <Activity logs={logs} />
                    </div>
                    </div>
                </div>
            
            </section>
        )
    }
}

export default Quiz;

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}