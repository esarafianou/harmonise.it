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
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'd/4',
                 duration: 2,
                 type: 'note',
                 editable: true,
                 accidental: 'n',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'b/4',
                 duration: 2,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'b/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: null
             },
             {
                 key: 'b/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: null
             }],
             [{                  // voice 3, tenoro voice
                 key: 'c/4',
                 duration: 4,
                 type: 'note',
                 editable: false,
                 accidental: '',
                 hint: '6',
                 rank: 5
             },
             {
                 key: 'd/4',
                 duration: 4,
                 type: 'pause',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'c/4',
                 duration: 2,
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
                 hint: '',
                 rank: null
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
                 hint: '',
                 rank: null
             },
             {
                 key: 'c/4',
                 duration: 2,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '',
                 rank: null
             },
             {
                 key: 'b/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '',
                 rank: null
             },
             {
                 key: 'a/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '',
                 rank: null
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

let init = (factoryWidth) => {
    let factory = new VF.Factory({renderer: {elementId: 'boo', width: factoryWidth, height: 1000}})
    let context = factory.getContext();
    return {factory: factory,
            context: context};
}

getNumOfBars = (voiceOne, num_beats, beat_value) => {
    totalDuration = 0;
    for (i = 0; i < voiceOne.length; i++) {
        totalDuration += 1 / voiceOne[i].duration;
    } 
    let numOfBars = totalDuration / (num_beats / beat_value);
    return numOfBars;
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
    let justification =  VF.Annotation.VerticalJustify.TOP;
    if (position === 'bottom') {
        justification = VF.Annotation.VerticalJustify.BOTTOM
    }
    return (new VF.Annotation(text)).setVerticalJustification(justification);
}

addConnectors = (system, i, changeLine, numOfBars) => {
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
    return system
}

checkIfBarCompleted = (note, barDuration, barCompleted, num_beats, beat_value) => {
    if ((1 / note.duration) + barDuration >= (num_beats / beat_value)) {
        barCompleted = true;
        barDuration = 0;
    } else {
        barDuration += 1 / note.duration;
    }
    return {barDuration: barDuration,
            barCompleted: barCompleted};
}

addNotesToStave = (i, voice, iterator, barCompleted, num_beats, beat_value) => {
    let notesArray = [];
    let barDuration = 0
    while (iterator < voice.length && (barCompleted === false)) {
        currentNote = voice[iterator];
        staveNote = new VF.StaveNote({keys: [currentNote.key],
                                      duration: getDuration(currentNote.duration, currentNote.type),
                                      stem_direction: getStemDirection(i)});
        if (currentNote.accidental != '' && currentNote.type !== 'pause') {
            staveNote.addAccidental(0, new VF.Accidental(currentNote.accidental));
        }
        if (currentNote.rank !== null) {
            staveNote.addAnnotation(0, newAnnotation(romanNumerals[currentNote.rank], 'bottom'))
        }
        if (currentNote.hint !== null) {
            staveNote.addAnnotation(0, newAnnotation(currentNote.hint, 'top'))
        }

        notesArray.push(staveNote);
        let checkResults = checkIfBarCompleted(currentNote, barDuration, barCompleted, num_beats, beat_value);
        barDuration = checkResults.barDuration;
        barCompleted = checkResults.barCompleted;
        iterator += 1;
    }

    return {iterator: iterator,
            notesArray: notesArray};
}

makeSystem = (factory, width, x, y, i, factoryWidth, changeLine) => {
    if (i !== 0 && i * width + 280 >= factoryWidth) {
        y += 250;
        x = 20;
        changeLine = true;
    }
	system = factory.System({ x: x, y: y, width: width, spaceBetweenStaves: 11});
	x += width;
    return {system: system,
            x: x,
            y: y,
            changeLine: changeLine};
}

let VF = Vex.Flow;


renderMusicPiece = (music_piece) => {
    let system, systemVars;
    let spaceBetweenStaves = 120;
    let factoryWidth = 1000;
    let x = 20;
    let y = 0;
    let num_beats = music_piece.tempo.split('/')[0];
    let beat_value = music_piece.tempo.split('/')[1];
    let trebleStave, bassStave;
    let changeLine = false;
    let staveNotesIterator = [[],[]];
    let bassVoice, voices, current_voice, trebleNotes, bassNotes, staveNote, barCompleted, currentNote, bass, barWidth;
    let bassNotesIterator = 0;

    let initResults = init(factoryWidth);
    let factory = initResults.factory;
    let context = initResults.context;

    let numOfBars = getNumOfBars(music_piece.staves[0].voices[0], num_beats, beat_value);

    // staveNotesIterator counts how many staveNotes of the voice k have been rendered
    for (let i = 0; i < music_piece.staves.length; i++) {
        for (let k = 0; k < music_piece.staves[0].voices.length; k++) { // k iterates through the voices of the treble clef stave
            staveNotesIterator[i][k] = 0;
        }
    }
    for (let i = 0; i < numOfBars; i++) {
        voicesToBeRendered = [];
        stavesToBeRendered = [];
        if (i === 0) {
            barWidth = 280;
        } else {
            barWidth = 220;
        }
        systemResults = makeSystem(factory, barWidth, x, y, i, factoryWidth, changeLine);
        system = systemResults.system;
        x = systemResults.x;
        y = systemResults.y;
        changeLine = systemResults.changeLine;

        for (let j = 0; j < music_piece.staves.length; j++) {
            voices = [];
            for (let k = 0; k < music_piece.staves[j].voices.length; k++) {
                current_voice = music_piece.staves[j].voices[k];
                barCompleted = false;
                let notesToStaveResults = addNotesToStave(k, current_voice, staveNotesIterator[j][k],
                                            barCompleted, num_beats, beat_value);
                staveNotesIterator[j][k] = notesToStaveResults.iterator;
                notes = notesToStaveResults.notesArray;
                voices.push(new VF.Voice({num_beats: num_beats,  beat_value: beat_value}).addTickables(notes));
            }
            stave = system.addStave({
                voices: voices,
            });

            if (i === 0) {
                stave.addClef(music_piece.staves[j].clef).addTimeSignature(music_piece.tempo).addKeySignature(music_piece.key);
            }
            if (changeLine === true) {
                stave.addClef(music_piece.staves[j].clef).addKeySignature(music_piece.key);
            }
            voicesToBeRendered.push(voices);
            stavesToBeRendered.push(stave);
            
        }
        system = addConnectors(system, i, changeLine, numOfBars);
        for (let i = 0; i < voicesToBeRendered.length; i++) { 
            factory.draw();
            voicesToBeRendered[i].forEach((v) => {v.draw(context, stavesToBeRendered[i]);});
        }
    }
}

renderMusicPiece(music_piece);
