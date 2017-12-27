import { Flow as VF } from 'vexflow'

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
  let factory = new VF.Factory({renderer: {elementId: element, width: factoryWidth, height: 150}})
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

let makeStave = (width, x, y, i, factoryWidth, changeLine) => {
  if (i !== 0 && i * width + 280 >= factoryWidth) {
    y += 250
    x = 20
    changeLine = true
  }
  let stave = new VF.Stave(x, y, width)
  x += width
  return {stave: stave,
    x: x,
    y: y,
    changeLine: changeLine}
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

export default function renderTheme (element, musicPiece) {
  if (typeof (window.leak) === 'undefined') {
    window.leak = []
  }
  window.leak.push(1)
  let notes, stave, staveResults
  let factoryWidth = 1000
  let x = 20
  let y = 10
  let numBeats = musicPiece.tempo.split('/')[0]
  let beatValue = musicPiece.tempo.split('/')[1]
  let changeLine = false
  let staveNotesIterator = [[], []]
  let currentVoice, barCompleted, barWidth

  let initResults = init(element, factoryWidth)
  let context = initResults.context

  let numOfBars = getNumOfBars(musicPiece.voice, numBeats, beatValue)

  staveNotesIterator = 0

  for (let i = 0; i < numOfBars; i++) {
    if (i === 0) {
      barWidth = 280
    } else {
      barWidth = 220
    }

    staveResults = makeStave(barWidth, x, y, i, factoryWidth, changeLine)
    stave = staveResults.stave
    x = staveResults.x
    y = staveResults.y
    changeLine = staveResults.changeLine

    currentVoice = musicPiece.voice
    barCompleted = false
    let notesToStaveResults = addNotesToStave(0, currentVoice, staveNotesIterator,
                                        barCompleted, numBeats, beatValue)
    staveNotesIterator = notesToStaveResults.iterator
    notes = notesToStaveResults.notesArray
    let voice = new VF.Voice({num_beats: numBeats, beatValue: beatValue}).addTickables(notes)

    if (i === 0) {
      stave.addClef(musicPiece.clef).addTimeSignature(musicPiece.tempo).addKeySignature(musicPiece.key)
    }
    if (changeLine === true) {
      stave.addClef(musicPiece.clef).addKeySignature(musicPiece.key)
    }
    stave.setContext(context).draw()

    new VF.Formatter().joinVoices([voice]).format([voice], barWidth)
    voice.draw(context, stave)
  }
}
