import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useHistory
import Flashcard from './Flashcard'; // Make sure to import the Flashcard component
import Study from './Study'; // imports flashcard component

const Collection = ({ flashcards }) => {
        const navigate = useNavigate(); // Create a history instance

        const handleCreateDeck = () => {
            navigate('/Decks'); // Redirect to the Create Deck page
        }

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
