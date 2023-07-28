
import './App.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Rowpost from './Components/Rowpost/Rowpost';
import { API_KEY } from './Constants/constants';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Rowpost title={'Originals'} type='tv' url={`discover/tv?api_key=${API_KEY}&with_networks=213`}/>
      <Rowpost title={'Action'} type='movie' isSmall url={`discover/movie?api_key=${API_KEY}&with_genres=28`}/>
      <Rowpost title={'Comedy'} type='movie' isSmall url={`discover/movie?api_key=${API_KEY}&with_genres=35`}/>
      <Rowpost title={'Horror'} type='movie' isSmall url={`discover/movie?api_key=${API_KEY}&with_genres=27`}/>
      <Rowpost title={'Romance'} type='movie' isSmall url={`discover/movie?api_key=${API_KEY}&with_genres=10749`}/>
      <Rowpost title={'Documentaries'} isSmall type='movie' url={`discover/movie?api_key=${API_KEY}&with_genres=99`}/>
    </div>
  ); 
}

export default App;
