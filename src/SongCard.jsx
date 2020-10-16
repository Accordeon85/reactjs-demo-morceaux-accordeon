import React from 'react'


const SongCard = (props) => {
  let link = props.Link ?
    <a href={props.Link} >Lien externe</a> : <div className='missingLink'>Lien non disponible</div>
  if (props.headerMode) {
    link = 'Lien'
  }
  return (
    <div className='songContainer'>
      <div className={props.songPropertyClassName}>
        { props.Title}
      </div>
      <div className={props.songPropertyClassName}>
        { props.Artist}
      </div>
      <div className={props.songPropertyClassName}>
        { props.Composer}
      </div>
      <div className={props.songPropertyClassName}>
        { props.Kind}
      </div>
      <div className={`${props.songPropertyClassName} songYear`}>
        { props.Year}
      </div>
      <div className={props.songPropertyClassName}>
        { props.InstrumentType}
      </div>
      <div className={`${props.songPropertyClassName} songLink`}>
        {link}
      </div>
    </div>
  )
}

export default SongCard