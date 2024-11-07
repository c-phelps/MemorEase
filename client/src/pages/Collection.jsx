
import React from "react";
import { useNavigate } from 'react-router-dom'; 
import Flashcard from '../components/Flashcard';
import Study from '../components/Study'; // imports flashcard component

const Collection = () => {
        const navigate = useNavigate(); // Create a history instance

        const handleCreateDeck = () => {
            navigate('/Decks'); // Redirect to the Create Deck page
        }
        const flashcards = [{
            id:1,
            question:"what is react",
            answer:"a awesome tool"
        }]
    return (
        <div className="collection">
            <h1>Collection</h1>
            <button onClick={handleCreateDeck}>Create New Deck</button>
            <div className="flashcard-collection">
                {flashcards.map((flashcard) => (
                    <Flashcard 
                        key={flashcard.id} 
                        question={flashcard.question} 
                        answer={flashcard.answer} 
                    />
                ))}
            </div>
        </div>
    );
};


export default Collection;
