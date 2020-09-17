import React, { useEffect, useState } from 'react';
import '../../App.scss';
import * as Tone from 'tone'
//import { Loop } from 'tone';

function PianoRoll(props) {

  const synth = new Tone.Synth().toDestination()
  let octave = props.octave

  // const note = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  const note = [`C${octave}`, `C#${octave}`, `D${octave}`, `D#${octave}`, `E${octave}`, `F${octave}`, `F#${octave}`, `G${octave}`, `G#${octave}`, `A${octave}`, `A#${octave}`, `B${octave}`]
  note.reverse()


  const div = []
  let savedNotes = props.savedNotes
 

  /* const [savedNotes, setSavedNotes] = useState(localStorage.getItem('savedNote') ? JSON.parse(localStorage.getItem('savedNote')) : []) */

  const playNote = (note, e) =>  {
    synth.triggerAttackRelease(note, "8n")
    console.log(e.target)
    if (e.target.classList.contains('test')) {
      e.target.classList.remove('test')
      console.log("savedNotes",savedNotes)
      console.log("attribute e.target",e.target.getAttribute('data-id') )

      savedNotes.map(item => {
        if (e.target.getAttribute('data-id') === item.col && e.target.getAttribute('data-note') === item.note) {
            
           savedNotes.splice(item,1)
           console.log(savedNotes)
          }
        })


        props.setSavedNotes(savedNotes=savedNotes) 
      localStorage.setItem('savedNote', JSON.stringify(savedNotes))

    } else {
      e.target.classList.add('test')
      console.log(note, e.currentTarget.getAttribute('data-id'))
      let col = e.currentTarget.getAttribute('data-id')
      let touche = note
      props.setSavedNotes(old => [...old, {
        col,
        note: touche
      }]) 
      localStorage.setItem('savedNote', JSON.stringify(savedNotes))
      
    }
  }


  useEffect(() => {
    let divs = document.querySelectorAll('.piano_grid div')

    divs.forEach(element => {
      element.classList.remove('test')
    });

    setTimeout(() => {
      savedNotes.map(item => {
        divs.forEach(element => {
          if (element.getAttribute('data-id') === item.col && element.getAttribute('data-note') === item.note) {
            element.classList.add('test')
          }
        });
      })
    }, 10);


    localStorage.setItem('savedNote', JSON.stringify(savedNotes))
  })




  // navigator.requestMIDIAccess().then(access => {
  //   const devices = access.inputs.values()
  //   for (let device of devices) {
  //     console.log(device);
  //     device.onmidimessage = OnMidiMessage
  //   }
  //   console.log(access)
  // })

  // function OnMidiMessage(message) {
  //   console.log(message);
  // }


  /* function loop() {
    for (let i = 4; i < 5; i++) {
      note.map(item => {
        notes.push(item + i)
      })
    }
    notes.reverse()
  } */

  function loopDiv() {
    for (let d = 0; d < 20; d++) {
      div.push(d)
    }
  }

  loopDiv()

  // loop()



  return (
    <div className="board">
      <div className="clavier-container" id="keyboard">

        {
          note.map((item, index) => {
            if (item.includes("#")) {
              return (
                <div onClick={() => synth.triggerAttackRelease(item, "8n")} key={index} value={item} className="black key"></div>
              )
            }
            else {
              if (item.includes('C')) {
                if (item.includes('#')) {

                }
                else {
                  return (
                    <div onClick={() => synth.triggerAttackRelease(item, "8n")} key={index} value={item} className="white key">{item}</div>
                  )
                }
              }
              else {
                return (
                  <div onClick={() => synth.triggerAttackRelease(item, "8n")} key={index} value={item} className="white key"></div>
                )
              }
            }
          })
        }
      </div>




      <section className="piano-containter">
        {note.map((touch, index) => {
          return (
            <section className={touch.includes('#') ? "piano_grid black" : "piano_grid white"}>
              {div.map((item, index) => {
                return <div
                  data-note={touch}
                  data-id={index}
                  onClick={(e) => playNote(touch, e)}
                  key={index}>{/* {touch} */}</div>
              })}
              {touch.includes('#') ? <button onClick={(e) => playNote(touch, e)} key={index} className="piano_grid_note-black"></button> : <button onClick={(e) => playNote(touch, e)} key={index} className="piano_grid_note-white">{touch.includes('C') ? (touch.includes('#') ? "" : touch) : ""}</button>}
            </section>
          )
        })}
      </section>





    </div>


  );
}


export default React.memo(PianoRoll)