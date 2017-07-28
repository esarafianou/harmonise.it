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
    let div = document.getElementById("boo"); 
    renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer_x = 1000;
    renderer.resize(renderer_x, 1500);
    context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
}

let createStaveBar = (i, isBassStave) => {
    let y = 0;
    let stave = staveBar;
    if (isBassStave === true) {
        y_stave += spaceBetweenStaves;
        y = 1
        stave = bassStaveBar
    }

    if (i==0) {
        stave = new VF.Stave(x_stave, y_stave, staveBarWidth);
        stave.addClef(music_piece.staves[y].clef)
                .addTimeSignature(music_piece.tempo)
                .addKeySignature(music_piece.key)
    } else if (i == numOfBars - 1){
        if (i*staveBarWidth + stave.x < renderer_x) {
            stave = new VF.Stave(staveBarWidth + stave.x, stave.y, staveBarWidth);
            stave.setEndBarType(VF.Barline.type.END);
        } else {
            if (stave == staveBar) {
                y_stave += 2*spaceBetweenStaves;
            }
            stave = new VF.Stave(x_stave, y_stave, staveBarWidth);
            stave.addClef(music_piece.staves[y].clef)
                 .addKeySignature(music_piece.key)
                 .setEndBarType(VF.Barline.type.END);
        }
    } else {
        if (i*staveBarWidth + stave.x < renderer_x) {
            stave = new VF.Stave(staveBarWidth + stave.x, stave.y, staveBarWidth);
        } else {
            if (stave == staveBar) {
                y_stave += 2*spaceBetweenStaves;
            }
            stave = new VF.Stave(x_stave, y_stave, staveBarWidth);
            stave.addClef(music_piece.staves[y].clef)
                 .addKeySignature(music_piece.key);
        }
    }
     
    if (isBassStave === true) {
        y_stave -= spaceBetweenStaves;
        bassStaveBar = stave
    } else {
        staveBar = stave
    }
}

getNumOfBars = () => {
    totalDuration = 0;
    for (i=0; i < music_piece.staves[0].voices[0].length; i++) {
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

checkIfBarCompleted = (note) => {
    if ((1 / note.duration) + barDuration >= (num_beats / beat_value)) {
        barCompleted = true;
        barDuration = 0;
    } else {
        barDuration += 1 / note.duration;
    }
}

addTrebleClefNotesToStave = (i = 0, voice, iterator, isBass) => {
    let voiceNotes;
    let notesArray = [];
    let hasAnnotations;
    if (isBass) {
        voiceNotes = bass;
        notesArray = notes;
        hasAnnotations = true;
    } else {
        voiceNotes = current_voice;
        notesArray = bassNotes;
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
        notes.push(staveNote);

        checkIfBarCompleted(currentNote);
        iterator += 1;
    }
}

addBassClefNotesToStave = (voice) => {
    while (bassNotesIterator < voice.length && barCompleted === false){
        currentNote = bass[bassNotesIterator];
        staveNote = new VF.StaveNote({keys: [currentNote.key],
                                      duration: getDuration(currentNote.duration, 
                                                            currentNote.type),
                                      stem_direction: 1});
        staveNote.addAnnotation(0, newAnnotation(romanNumerals[currentNote.rank], 'bottom'))
        staveNote.addAnnotation(0, newAnnotation(currentNote.hint, 'top'))
        if (currentNote.accidental != '' && currentNote.type !== 'pause') {
            staveNote.addAccidental(0, new VF.Accidental(currentNote.accidental));
        }
        bassNotes.push(staveNote);
        checkIfBarCompleted(currentNote);
        bassNotesIterator += 1;
    }
}

newAnnotation = (text, position) => {
    if (position === 'bottom') {
        return (new VF.Annotation(text)).setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM);
    } else {
        return (new VF.Annotation(text)).setVerticalJustification(VF.Annotation.VerticalJustify.TOP);
    }
}

let context, renderer, renderer_x; 
let x_stave = 10;
let y_stave = 0; 
let staveBarWidth = 300;
let spaceBetweenStaves = 120;

let num_beats = music_piece.tempo.split('/')[0];
let beat_value = music_piece.tempo.split('/')[1];
let numOfBars; 

init();
getNumOfBars();

let staveBar, bassStaveBar;

// staveNotesIterator counts how many staveNotes of the voice k have been rendered
let staveNotesIterator = [];
for (let k=0; k<music_piece.staves[0].voices.length; k++) { // k iterates through the voices of the treble clef stave
    staveNotesIterator[k] = 0; 
}
let bassVoice, voices, barDuration, current_voice, notes, staveNote, barCompleted, currentNote, bass, bassNotes;

let bassNotesIterator = 0;
for (let i=0; i<numOfBars; i++) {
    createStaveBar(i, false);
    staveBar.setContext(context).draw();
    bassVoice = []
    voices = [];
    // Voices of the treble clef stave
    for (let k=0; k<music_piece.staves[0].voices.length; k++) { 
        current_voice = music_piece.staves[0].voices[k];   
        notes = [];
        barCompleted = false; 
        barDuration = 0;
        addTrebleClefNotesToStave(k, current_voice, staveNotesIterator[k], false);
        voices.push(new VF.Voice({num_beats: num_beats,  beat_value: beat_value}).addTickables(notes));
    }
    // bass Voice 
    createStaveBar(i, true);
    bassStaveBar.setContext(context).draw();
    bass = music_piece.staves[1].voices[0]
    bassNotes = []
    barCompleted = false;
    addBassClefNotesToStave(bass);
    bassVoice.push(new VF.Voice({num_beats: num_beats,  beat_value: beat_value}).addTickables(bassNotes));

    let formatter = new VF.Formatter().joinVoices(voices).joinVoices(bassVoice)
                                      .format(voices, staveBar.width).format(bassVoice, staveBar.width);

    voices.forEach(function(v) { v.draw(context, staveBar); });
    bassVoice.forEach(function(v) { v.draw(context, bassStaveBar); });

}
