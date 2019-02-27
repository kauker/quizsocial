import React from 'react';

const Question = ({question, answers, currentIndex, userAnswer, handleClickAnswer}) => {
    const answersItems = answers
        .map((answer, i) => {
            let btnClass = 'is-light';
            if (userAnswer && userAnswer === answer && userAnswer === question.correct_answer) btnClass = 'is-success'
            if (userAnswer && userAnswer === answer && userAnswer !== question.correct_answer) btnClass = 'is-danger'
            if (userAnswer && userAnswer !== answer && answer === question.correct_answer) btnClass = 'is-success is-outlined'
            return <button key={i} className={`button is-large ${btnClass}`} 
                                    onClick={e => !userAnswer && handleClickAnswer(answer)}
                                    dangerouslySetInnerHTML={{ __html: answer }}>{}</button>
                            }
    )
    return (
        <div className="content is-medium">
        <span class="tag is-warning">{question.category}</span>
        <h2>Q. {++currentIndex}: <span dangerouslySetInnerHTML={{ __html: question.question }}>{}</span></h2>
        
        <div class="box">
            {answersItems}
        </div>
        </div>
    )
}

export default Question;