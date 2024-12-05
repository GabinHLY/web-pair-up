import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <h1>Web Pair Up</h1>
      <div className="homepage">
        <Link to="/rules">
          <button>RULES</button>
        </Link>
        <Link to="/new-game">
          <button>NEW GAME</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
