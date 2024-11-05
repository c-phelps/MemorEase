import React from "react";
import { useNavigate } from 'react-router-dom';

const Flashcard = ({question, answer}) => {
    return (
        <div>
            <h1>{question}</h1>
            <p>{answer}</p>
            </div>
    )
}

export default Flashcard;