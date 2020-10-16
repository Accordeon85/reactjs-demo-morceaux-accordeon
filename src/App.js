import React, { useState, useEffect } from 'react'
import './App.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import NumericInput from 'react-numeric-input'
import musicKinds from './musicKinds'
import instrumentTypes from './instrumentTypes'
import data from './chansons_accordeon'
import SongCard from './SongCard'
import FooterBar from './FooterBar'


const defaultMusicKind = musicKinds[0]
const defaultInstrumentType = instrumentTypes[0]

const orders = [
  {value:'Title', label:'Titre'},
  {value:'Artist', label:'Artiste/Groupe'},
  {value:'Composer', label:'Auteurs/Compositeurs'},
  {value:'Kind', label:'Genre'},
  {value:'Recording year', label:'Année d\'enregistrement'},
  {value:'Instrument type', label:'Type d\'instrument'}
]

const defaultOrder = orders[0]
const minYear = 1920
const maxYear = new Date().getFullYear()

function App() {
  let songs = Object.values(data)
  let [currentOrder, updateOrderByValue] = useState(defaultOrder)
  let [searchTitle, updateSearchTitle] = useState('')
  let [searchArtist, updateSearchArtist] = useState('')
  let [currentKind, updateMusicKind] = useState(defaultMusicKind)
  let [currentMinYear, updateMinYear] = useState(minYear)
  let [currentMaxYear, updateMaxYear] = useState(maxYear)
  let [currentInstrumentType, updateInstrumentType] = useState(defaultInstrumentType)
  const [songsStyle, setsongsStyle] = useState({ paddingTop: `${86}px` })

  useEffect(() => {
    window.addEventListener("resize", () => {
      const height = document.getElementsByClassName('titlebar')[0].clientHeight
      setsongsStyle({ paddingTop: `${height}px` })
      //console.log(window.innerWidth)
    });
  }, []);

  const handleTitleSearch = event => {
    updateSearchTitle(event.target.value)
  }

  const handleArtistSearch = event => {
    updateSearchArtist(event.target.value)
  }

  const filterByYear = year => {
    if (!year) return false
    year = Number(year)
    return year >= currentMinYear 
      && year <= currentMaxYear
  }

  return (
    <div className="App">
      <div className='titlebar'>
        <div className='title'>
            <h2>Quelques morceaux avec de l'accordéon</h2>
        </div>
        <div className='maindiv'>
          Trier par
          <Dropdown options={orders} value={currentOrder} 
            controlClassName='dropdown'
            onChange={updateOrderByValue} 
            placeholder="Select an option" />
        </div>
        <div className='maindiv'>
          <table className='innertable'>
            <tbody>
              <tr>
                <td>
                Rechercher par titre
                </td>
                <td>
                <input type='text' className='nameTextInput' onChange={handleTitleSearch} />
                </td>
              </tr>
              <tr>
                <td>
                  Rechercher par nom d'artiste/groupe
                </td>
                <td>
                  <input type='text' className='nameTextInput' onChange={handleArtistSearch} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='maindiv'>
          Rechercher par genre
          <Dropdown options={musicKinds} value={defaultMusicKind}
            controlClassName='dropdown'
            onChange={updateMusicKind} placeholder="Select an option" />
        </div>
        <div className='maindiv'>
          <div>
            Rechercher par année
          </div>
          <table className='innertable'>
            <tbody>
              <tr>
                <td>
                  de
                  </td>
                  <td>
                  <NumericInput min={minYear} max={maxYear} onChange={updateMinYear} className="numericInput" />
                </td>
              </tr>
              <tr>
                <td>
                  à
                  </td>
                <td>
                  <NumericInput min={minYear} max={maxYear} onChange={updateMaxYear} className="numericInput" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='maindiv'>
          Rechercher par instrument
          <Dropdown options={instrumentTypes} value={defaultInstrumentType}
            controlClassName='dropdown'
           onChange={updateInstrumentType} placeholder="Select an option" />
        </div>
      </div>
      <div className='songs' style={songsStyle}>
      <SongCard Title="Titre" 
        Artist='Artiste/Groupe' Link='Lien'
        Composer='Auteur/Compositeur'
        Year='Année' 
        InstrumentType='Instrument'
        Kind='Genre/style' headerMode={true}
        songPropertyClassName='songProperty songHeaderProperty' />
      { 
        songs.filter(s => s.Title.toLowerCase().includes(searchTitle.toLowerCase()))
        .filter(s => s.Artist.toLowerCase().includes(searchArtist.toLowerCase()))
        .filter(s => s.Kind === currentKind.label || currentKind.value === 'all')
        .filter(s => filterByYear(s['Recording year']))
        .filter(s => s['Instrument type'] === currentInstrumentType.label || currentInstrumentType.value === 'all')
        .sort((a, b) => a[currentOrder.value].localeCompare(b[currentOrder.value]))
        .map((c, i) => 
          <SongCard key={i} Title={c.Title} Artist={c.Artist} 
            Link={c.Link} Year={c['Recording year']} Kind={c.Kind}
            InstrumentType={c['Instrument type']}
            Composer={c.Composer}
            songPropertyClassName='songProperty' />)
      }
      </div>
      <FooterBar />
    </div>
  );
}

export default App;
