//sample data
let music_piece = {
   key: 'A',
   tempo: '2/4',
   staves: [{       // 2 staves, 1 for treble clef and 1 for bass clef
     clef: 'treble',
     voices: [[{                  // voice 1, soprano voice
                 key: 'c/5',
                 duration: 2,
                 type: 'note',
                 editable: true,
                 accidental: 'b', // accidental can be one of the following: bb, b, #, ##, n
                 hint: '',
                 rank: 1
             }, 
             {
                 key: 'd/5',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '',
                 rank: 1
             },
             {
                 key: 'e/5',
                 duration: 4,
                 type: 'pause',
                 editable: true,
                 accidental: '',
                 hint: '',
                 rank: 1
             },
             {
                 key: 'd/5',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: 'n',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'e/5',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'c/5',
                 duration: 2,
                 type: 'pause',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             }], 
             [{                  // voice 2, alto voice
                 key: 'a/4',
                 duration: 4,
                 type: 'note',
                 editable: false,
                 accidental: '',
                 hint: '6',
                 rank: 5
             },
             {
                 key: 'g/4',
                 duration: '4',
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'd/4',
                 duration: '2',
                 type: 'note',
                 editable: true,
                 accidental: 'n',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'b/4',
                 duration: '2',
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'b/4',
                 duration: '4',
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'b/4',
                 duration: '4',
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             }],
             [{                  // voice 3, tenoro voice
                 key: 'c/4',
                 duration: '4',
                 type: 'note',
                 editable: false,
                 accidental: '',
                 hint: '6',
                 rank: 5
             },
             {
                 key: 'd/4',
                 duration: '4',
                 type: 'pause',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'c/4',
                 duration: '2',
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'b/3',
                 duration: 2,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'f/4',
                 duration: 2,
                 type: 'pause',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             }]
         ]
     },
     { 
        clef: 'bass',
        voices: [[{                  // bass voice
                 key: 'f/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: 'b',
                 hint: '',
                 rank: 1
             }, 
             {
                 key: 'd/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6',
                 rank: 4
             },
             {
                 key: 'c/4',
                 duration: 2,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6',
                 rank: 5
             },
             {
                 key: 'b/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '',
                 rank: 1
             },
             {
                 key: 'a/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 4',
                 rank: 5
             },
             {
                 key: 'e/4',
                 duration: 2,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '',
                 rank: 1
             }]
        ]
    }]
}

let romanNumerals = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII'
}

let init = () => {
    VF = Vex.Flow;
    factory = new VF.Factory({renderer: {elementId: 'boo', width: factoryWidth, height: 1000}})
    context = factory.getContext();
}

getNumOfBars = () => {
    totalDuration = 0;
    for (i = 0; i < music_piece.staves[0].voices[0].length; i++) {
        totalDuration += 1 / music_piece.staves[0].voices[0][i].duration ; 
    } 
    numOfBars = totalDuration / (num_beats / beat_value)
}

getStemDirection = (k) => {
    if (k == 2) {
        return -1;
    } else {
        return 1;
    }
}

getDuration = (duration, type) => {
    if (type === 'pause') {
        return duration.toString() + 'r';
    } else {
        return duration.toString();
    }
}

newAnnotation = (text, position) => {
    if (position === 'bottom') {
        return (new VF.Annotation(text)).setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM);
    } else {
        return (new VF.Annotation(text)).setVerticalJustification(VF.Annotation.VerticalJustify.TOP);
    }
}

addConnectors = (i, changeLine) => {
    if (i==0 || changeLine === true) {
        system.addConnector('singleLeft')
        changeLine = false;
    }
    if (i == 0) {
        system.addConnector('brace');
    }
    if (i === numOfBars-1) {
        system.addConnector('boldDoubleRight');
    } else {
        system.addConnector('singleRight');
    }
}

checkIfBarCompleted = (note) => {
    if ((1 / note.duration) + barDuration >= (num_beats / beat_value)) {
        barCompleted = true;
        barDuration = 0;
    } else {
        barDuration += 1 / note.duration;
    }
}

addNotesToStave = (i, voice, iterator, isBass) => {
    let voiceNotes;
    let notesArray = [];
    let hasAnnotations;

    if (isBass) {
        voiceNotes = bass;
        notesArray = bassNotes;
        hasAnnotations = true;
    } else {
        voiceNotes = current_voice;
        notesArray = trebleNotes;
        hasAnnotations = false;
    }

    while (iterator < voice.length && (barCompleted === false)) {
        currentNote = voiceNotes[iterator];
        staveNote = new VF.StaveNote({keys: [currentNote.key],
                                      duration: getDuration(currentNote.duration, currentNote.type),
                                      stem_direction: getStemDirection(i)});
        if (currentNote.accidental != '' && currentNote.type !== 'pause') {
            staveNote.addAccidental(0, new VF.Accidental(currentNote.accidental));
        }
        if (hasAnnotations) {
            staveNote.addAnnotation(0, newAnnotation(romanNumerals[currentNote.rank], 'bottom'))
            staveNote.addAnnotation(0, newAnnotation(currentNote.hint, 'top'))
        }
        notesArray.push(staveNote);
        checkIfBarCompleted(currentNote);
        iterator += 1;
    }

    if (isBass) {
        bassNotesIterator = iterator;
        bassNotes = notesArray;
    } else {
        staveNotesIterator[i] = iterator;
        trebleNotes = notesArray;
    }
}

makeSystem = (width, i) => {
    if (i !== 0 && i * width + 280 >= factoryWidth) {
        y += 250;
        x = 20;
        changeLine = true;
    }
	system = factory.System({ x: x, y: y, width: width, spaceBetweenStaves: 11});
	x += width;
    return system
}

let system, factory, context;
let spaceBetweenStaves = 120;
let factoryWidth = 1000;
let x = 20;
let y = 0;
let num_beats = music_piece.tempo.split('/')[0];
let beat_value = music_piece.tempo.split('/')[1];
let numOfBars, trebleStave, bassStave;
let changeLine = false;
let staveNotesIterator = [];
let bassVoice, voices, barDuration, current_voice, trebleNotes, bassNotes, staveNote, barCompleted, currentNote, bass;
let bassNotesIterator = 0;

init();
getNumOfBars();

// staveNotesIterator counts how many staveNotes of the voice k have been rendered
for (let k=0; k<music_piece.staves[0].voices.length; k++) { // k iterates through the voices of the treble clef stave
    staveNotesIterator[k] = 0; 
}

for (let i=0; i<numOfBars; i++) {
    bassVoice = []
    voices = [];
    // Voices of the treble clef stave
    for (let k=0; k<music_piece.staves[0].voices.length; k++) { 
        current_voice = music_piece.staves[0].voices[k];   
        trebleNotes = [];
        barCompleted = false; 
        barDuration = 0;
        addNotesToStave(k, current_voice, staveNotesIterator[k], false);
        voices.push(new VF.Voice({num_beats: num_beats,  beat_value: beat_value}).addTickables(trebleNotes));
    }
    if (i==0) {
        system = makeSystem(280, i);
    } else {
        system = makeSystem(220, i);
    }
    trebleStave = system.addStave({
        voices: voices,
    });
    if (i==0) {
        trebleStave.addClef('treble').addTimeSignature(music_piece.tempo).addKeySignature(music_piece.key) ;
    }
    if (changeLine === true) {
        trebleStave.addClef('treble').addKeySignature(music_piece.key) ;
    }
    // bass Voice 
    bass = music_piece.staves[1].voices[0]
    bassNotes = []
    barCompleted = false;
    addNotesToStave(0, bass, bassNotesIterator, true);
    bassStave = system.addStave({
        voices: bassVoice,
    }) 
    if (i==0) {
        bassStave.addClef('bass').addTimeSignature(music_piece.tempo).addKeySignature(music_piece.key) ;
    }
    if (changeLine === true) {
        bassStave.addClef('bass').addKeySignature(music_piece.key) ;
    }
    bassVoice.push(new VF.Voice({num_beats: num_beats,  beat_value: beat_value}).addTickables(bassNotes));

    addConnectors(i, changeLine);
    factory.draw();
    voices.forEach(function(v) { v.draw(context, trebleStave); });
    bassVoice.forEach(function(v) { v.draw(context, bassStave); });
}
