let romanNumerals = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII'
}

let init = (element, factoryWidth) => {
  let factory = new VF.Factory({renderer: {elementId: element, width: factoryWidth, height: window.innerHeight - 100}})
  let context = factory.getContext()
  return {factory: factory,
    context: context}
}

let getNumOfBars = (voiceOne, numBeats, beatValue) => {
  let totalDuration = 0
  for (let i = 0; i < voiceOne.length; i++) {
    totalDuration += 1 / voiceOne[i].duration
  }
  let numOfBars = totalDuration / (numBeats / beatValue)
  return numOfBars
}

let getStemDirection = (k) => {
  if (k === 2) {
    return -1
  } else {
    return 1
  }
}

let getDuration = (duration, type) => {
  if (type === 'pause') {
    return duration.toString() + 'r'
  } else {
    return duration.toString()
  }
}

let newAnnotation = (text, position) => {
  let justification = VF.Annotation.VerticalJustify.TOP
  if (position === 'bottom') {
    justification = VF.Annotation.VerticalJustify.BOTTOM
  }
  return (new VF.Annotation(text)).setVerticalJustification(justification)
}

let addConnectors = (system, i, changeLine, numOfBars) => {
  if (i === 0 || changeLine === true) {
    system.addConnector('singleLeft')
    changeLine = false
  }
  if (i === 0) {
    system.addConnector('brace')
  }
  if (i === numOfBars - 1) {
    system.addConnector('boldDoubleRight')
  } else {
    system.addConnector('singleRight')
  }
  return system
}

let checkIfBarCompleted = (note, barDuration, barCompleted, numBeats, beatValue) => {
  if ((1 / note.duration) + barDuration >= (numBeats / beatValue)) {
    barCompleted = true
    barDuration = 0
  } else {
    barDuration += 1 / note.duration
  }
  return {barDuration: barDuration,
    barCompleted: barCompleted}
}

let addNotesToStave = (i, voice, iterator, barCompleted, numBeats, beatValue) => {
  let notesArray = []
  let barDuration = 0
  let currentNote, staveNote, checkResults
  while (iterator < voice.length && (barCompleted === false)) {
    currentNote = voice[iterator]
    staveNote = new VF.StaveNote({keys: [currentNote.key],
      duration: getDuration(currentNote.duration, currentNote.type),
      stem_direction: getStemDirection(i)})
    if (currentNote.accidental !== '' && currentNote.type !== 'pause') {
      staveNote.addAccidental(0, new VF.Accidental(currentNote.accidental))
    }
    if (currentNote.rank !== null) {
      staveNote.addAnnotation(0, newAnnotation(romanNumerals[currentNote.rank], 'bottom'))
    }
    if (currentNote.hint !== null) {
      staveNote.addAnnotation(0, newAnnotation(currentNote.hint, 'top'))
    }

    notesArray.push(staveNote)
    checkResults = checkIfBarCompleted(currentNote, barDuration, barCompleted, numBeats, beatValue)
    barDuration = checkResults.barDuration
    barCompleted = checkResults.barCompleted
    iterator += 1
  }

  return {iterator: iterator,
    notesArray: notesArray}
}

let makeSystem = (factory, width, x, y, i, factoryWidth, changeLine) => {
  if (i !== 0 && i * width + 280 >= factoryWidth) {
    y += 250
    x = 20
    changeLine = true
  }
  let system = factory.System({ x: x, y: y, width: width, spaceBetweenStaves: 11 })
  x += width
  return {system: system,
    x: x,
    y: y,
    changeLine: changeLine}
}

let VF = Vex.Flow

export default function renderMusicPiece (element, musicPiece) {
  if (typeof (window.leak) === 'undefined') {
    window.leak = []
  }
  window.leak.push(1)
  let system, systemResults, voicesToBeRendered, stavesToBeRendered, notes, stave
  let factoryWidth = 1000
  let x = 20
  let y = 0
  let numBeats = musicPiece.tempo.split('/')[0]
  let beatValue = musicPiece.tempo.split('/')[1]
  let changeLine = false
  let staveNotesIterator = [[], []]
  let voices, currentVoice, barCompleted, barWidth

  let initResults = init(element, factoryWidth)
  let factory = initResults.factory
  let context = initResults.context

  let numOfBars = getNumOfBars(musicPiece.staves[0].voices[0], numBeats, beatValue)

    // staveNotesIterator counts how many staveNotes of the voice k have been rendered
  for (let i = 0; i < musicPiece.staves.length; i++) {
    for (let k = 0; k < musicPiece.staves[0].voices.length; k++) { // k iterates through the voices of the treble clef stave
      staveNotesIterator[i][k] = 0
    }
  }
  for (let i = 0; i < numOfBars; i++) {
    voicesToBeRendered = []
    stavesToBeRendered = []
    if (i === 0) {
      barWidth = 280
    } else {
      barWidth = 220
    }
    systemResults = makeSystem(factory, barWidth, x, y, i, factoryWidth, changeLine)
    system = systemResults.system
    x = systemResults.x
    y = systemResults.y
    changeLine = systemResults.changeLine

    for (let j = 0; j < musicPiece.staves.length; j++) {
      voices = []
      for (let k = 0; k < musicPiece.staves[j].voices.length; k++) {
        currentVoice = musicPiece.staves[j].voices[k]
        barCompleted = false
        let notesToStaveResults = addNotesToStave(k, currentVoice, staveNotesIterator[j][k],
                                            barCompleted, numBeats, beatValue)
        staveNotesIterator[j][k] = notesToStaveResults.iterator
        notes = notesToStaveResults.notesArray
        voices.push(new VF.Voice({num_beats: numBeats, beatValue: beatValue}).addTickables(notes))
      }
      stave = system.addStave({
        voices: voices
      })

      if (i === 0) {
        stave.addClef(musicPiece.staves[j].clef).addTimeSignature(musicPiece.tempo).addKeySignature(musicPiece.key)
      }
      if (changeLine === true) {
        stave.addClef(musicPiece.staves[j].clef).addKeySignature(musicPiece.key)
      }
      voicesToBeRendered.push(voices)
      stavesToBeRendered.push(stave)
    }
    system = addConnectors(system, i, changeLine, numOfBars)
    for (let i = 0; i < voicesToBeRendered.length; i++) {
      factory.draw()
      voicesToBeRendered[i].forEach((v) => { v.draw(context, stavesToBeRendered[i]) })
    }
  }
}
