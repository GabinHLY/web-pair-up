import { useState } from "react";
import { Link } from "react-router-dom";

function Rules() {
  const rulesPages = [
    {
      title: "Goal of the Game",
      content: "Build the most functional website by correctly pairing HTML and CSS cards, while leveraging Bonus/Penalty cards to gain points or disrupt opponents. The game ends when a player fills their Website Board. The player with the highest score wins."
    },
    {
      title: "Setup",
      content: `
        Prepare the Cards:
        Shuffle all cards (HTML, CSS, Bonus, and Penalty) and place them face down on the table.
        
        Distribute Website Boards
        Each player receives 2 Website Boards with HTML and CSS.
        
        Use the Add-on
        Scan the Add-on Code Card with a smartphone or tablet.
        Input player names and create a game session. The Add-on acts as the game master:
        Announces turn order
        Manages turns
        Applies Bonus/Penalty effects
        Tracks scores and declares the winner
      `
    },
    {
      title: "How to Play",
      content: `
        Turn Sequence
        Active Player Selection: The Add-on announces the player for the current turn.
        Flip Two Cards: The active player selects and flips two cards from the draw pile.
        Match Evaluation:
        Valid Pair: If the cards form a valid pair:
        Add the pair to the corresponding section of your Website Board.
        Notify the Add-on to update your score.
        Invalid Pair: If the cards don’t match, return them face down to their original spots. The turn passes to the next player.

      `
    },
    {
      title: "Rules for Valid Pairs",
      content: `
        HTML Pair: Two identical cards with the same HTML tag (e.g., <h1> and <h1>).

        CSS Pair: Two identical cards with the same CSS rule (e.g., color: red; and color: red;).

        Using CSS Pairs: CSS pairs can only be applied to HTML elements already on your board.
        Unused CSS pairs are kept aside until a matching HTML element is placed.


      `
    },
    {
      title: "Bonus/Penalty Cards",
      content: `
        Bonus Cards:
        - Copy Pasta: Steal a pair from another player.
        - Extra Turn: Play another turn immediately.
        - Double Points: Double points for the next valid pair.
        - Free Match: Match this card with any other card.

        Penalty Cards:
        - Bug: Attach this to a card; it no longer counts.
        - Broken Tag: Lose a previously collected card.
        - Syntax Error: Skip your next turn.
        - CSS Overload: Discard one matched pair.
      `
    },
    {
      title: "Game End and Scoring",
      content: `
        Game End:
        - The game ends when a player fills their board (both HTML and CSS sections).
        - The Add-on declares the winner based on the highest score.

        Scoring:
        - HTML Pairs: Two identical cards (e.g., <h1> and <h1>) score 2 points each.
        - CSS Pairs: Two identical cards (e.g., color: red;) score 2 points each.
      `
    },
    {
      title: "Card List",
      content: `
        HTML Cards (16 cards):
        - <h1> × 4 (2 points each)
        - <p> × 4 (2 points each)
        - <img> × 4 (2 points each)
        - <div> × 4 (2 points each)
        
        CSS Cards (16 cards):
        - color: red; × 4 (Combines with <h1>, <p>)
        - font-size: 16px; × 4 (Combines with <h1>, <p>)
        - background-color: blue; × 4 (Combines with <img>, <div>, <p>, <h1>)
        - border-radius: 10px; × 4 (Combines with <img>, <div>)
      `
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < rulesPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>{rulesPages[currentPage].title}</h1>
      <p style={{ whiteSpace: "pre-line" }}>{rulesPages[currentPage].content}</p>
      <div>
        <button onClick={previousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === rulesPages.length - 1}>
          Next
        </button>
      </div>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default Rules;
