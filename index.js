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
                 hint: '6 5# 3',
                 rank: 1
             }, 
             {
                 key: 'd/5',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '#',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'e/5',
                 duration: 4,
                 type: 'pause',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
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
                 accidental: '#',
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
                 duration: '2',
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             }],
             [{                  // voice 2, tenoro voice
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
                 hint: '6 5# 3',
                 rank: 1
             }, 
             {
                 key: 'd/4',
                 duration: 4,
                 type: 'note',
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
                 key: 'b/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'a/4',
                 duration: 4,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
                 rank: 1
             },
             {
                 key: 'e/4',
                 duration: 2,
                 type: 'note',
                 editable: true,
                 accidental: '',
                 hint: '6 5# 3',
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
    renderer_x = 1200;
    // Configure the rendering context.
    renderer.resize(renderer_x, 500);
    context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

}

let createStaveBar = (i, isBassStave) => {
    
    let y = 0;
    let stave = staveBar;
    console.log(y_stave);
    if (isBassStave === true) {
        y_stave += 100;
        y = 1
        stave = bassStaveBar
    }

    console.log(music_piece.staves[y].clef, i);
    if (i==0) {
        // Create a stave of width 300 at position 10, 40 on the canvas.
        // Add clef, time signature, keySignature and endBarType.
        stave = new VF.Stave(x_stave, y_stave, staveBarWidth);
        stave.addClef(music_piece.staves[y].clef)
                .addTimeSignature(music_piece.tempo)
                .addKeySignature(music_piece.key)
                .setEndBarType(VF.Barline.type.SINGLE);
    } else if (i == numOfBars - 1){
        if (i*stave.width + staveBar.x < renderer_x) {
            //last bar - juxtaposing bar next to the previous bar
            stave = new VF.Stave(stave.width + stave.x, stave.y, staveBarWidth);
            stave.setEndBarType(VF.Barline.type.END);
        } else {
            y_stave += 100;
            stave = new VF.Stave(x_stave, y_stave, staveBarWidth);
            stave.addClef(music_piece.staves[y].clef)
                 .addKeySignature(music_piece.key)
                    .setEndBarType(VF.Barline.type.END);
        }
    } else {
        if (i*stave.width + stave.x < renderer_x) {
            //last bar - juxtaposing bar next to the previous bar
            stave = new VF.Stave(stave.width + staveBar.x, stave.y, staveBarWidth);
            stave.setEndBarType(VF.Barline.type.SINGLE);
        } else {
            y_stave += 100;
            stave = new VF.Stave(x_stave, y_stave, staveBarWidth);
            stave.addClef(music_piece.staves[y].clef)
                 .addKeySignature(music_piece.key)
                 .setEndBarType(VF.Barline.type.SINGLE);
        }
    }
     
    if (isBassStave === true) {
        y_stave -= 100;
        bassStaveBar = stave
    } else {
        staveBar = stave
    }
}

getNumOfBars = (totalDuration) => {
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

//newAnnotation = (text) => {
//	return (new VF.Annotation(text)).setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM);
//}

let context; 
let x_stave = 10;
let y_stave = 0; 
let staveBarWidth = 300;
let renderer;
let renderer_x;

init();

let num_beats = music_piece.tempo.split('/')[0];
let beat_value = music_piece.tempo.split('/')[1];
let numOfBars; 

getNumOfBars(0);

let staveBar;
let bassStaveBar;

// staveNotesIterator counts how many staveNotes of the voice k have been rendered
let staveNotesIterator = [];
for (let k=0; k<music_piece.staves[0].voices.length; k++) { // k iterates through the voices of the treble clef stave
    staveNotesIterator[k] = 0; 
}

let bassNotesIterator = 0;
//numOfBars = 3
for (let i=0; i<numOfBars; i++) {   // variable i iterates through staveBars
    // create stavebar, connect it to the rendering context and draw!
    createStaveBar(i, false);
    staveBar.setContext(context).draw();
    let bassVoice = []
    let voices = [];
    let barDuration;
    for (let k=0; k<music_piece.staves[0].voices.length; k++) { // k iterates through the voices of the treble clef stave
        let current_voice = music_piece.staves[0].voices[k];   
        let notes = [];
        let staveNote;
        let barCompleted = false; 
        barDuration = 0;
        let duration;
        let currentNote;
        while (staveNotesIterator[k] < current_voice.length && (barCompleted === false)) {

            currentNote = current_voice[staveNotesIterator[k]];
            staveNote = new VF.StaveNote({keys: [currentNote.key],
                                          duration: getDuration(currentNote.duration, currentNote.type),
                                          stem_direction: getStemDirection(k)});
			//staveNote.addAnnotation(0, newAnnotation('quiet'))
            if (currentNote.accidental != '' && currentNote.type !== 'pause') {
                staveNote.addAccidental(0, new VF.Accidental(currentNote.accidental));
            }

            notes.push(staveNote);

            if ((1 / currentNote.duration) + barDuration >= (num_beats / beat_value)) {
                barCompleted = true;
                barDuration = 0;
            } else {
                barDuration += 1 / currentNote.duration;
            }
            staveNotesIterator[k] += 1;
        }

        voices.push(new VF.Voice({num_beats: num_beats,  beat_value: beat_value}).addTickables(notes));
    }

    createStaveBar(i, true);
    bassStaveBar.setContext(context).draw();
    barCompleted = false;
    let bass = music_piece.staves[1].voices[0]
    let bassNotes = []
    console.log(bass);
    while (bassNotesIterator < bass.length && barCompleted === false){
        staveNote = new VF.StaveNote({keys: [bass[bassNotesIterator].key],
                                      duration: getDuration(bass[bassNotesIterator].duration, 
                                                            bass[bassNotesIterator].type),
                                      stem_direction: 1});
        //staveNote.addAnnotation(0, newAnnotation('quiet'))
        if (bass[bassNotesIterator].accidental != '' && bass[bassNotesIterator].type !== 'pause') {
            staveNote.addAccidental(0, new VF.Accidental(bass[bassNotesIterator].accidental));
        }
        console.log(staveNote);
        bassNotes.push(staveNote);
        
        if ((1 / bass[bassNotesIterator].duration) + barDuration >= (num_beats / beat_value)) {
            barCompleted = true;
            barDuration = 0;
        } else {
            barDuration += 1 / bass[bassNotesIterator].duration;
        }
        bassNotesIterator += 1;
    }

    bassVoice.push(new VF.Voice({num_beats: num_beats,  beat_value: beat_value}).addTickables(bassNotes));
    // Format and justify the notes to 300 pixels.

    let formatter = new VF.Formatter().joinVoices(voices).joinVoices(bassVoice)
                                      .format(voices, staveBar.width).format(bassVoice, staveBar.width);

    // Render voices
    voices.forEach(function(v) { v.draw(context, staveBar); });
    bassVoice.forEach(function(v) { v.draw(context, bassStaveBar); });

}

//$( "svg" ).mousemove(function( event ) {
//    // mouse position in relation with svg		
//	let x = event.pageX - $(this).offset().left;
//    let y = event.pageY - $(this).offset().top;
//
//	let x_left_stave = 10;
//	let y_top_stave = 40;
//    let stave_width = 400;
//
//    let x_right_stave = x_left_stave + stave_width;
//    let y_bottom_stave = y_top_stave + 10*4;  
//
//	x -= x_left_stave;
//    y -= y_top_stave;
//
//    if (x > 0 && x < x_right_stave && y > 0  && y < y_bottom_stave) {
//        console.log('mouse within stave');
//        if (y <  2) {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["f/5"], duration: "q" })] 
//        } else if (y < 8) {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["e/5"], duration: "q" })] 
//        } else if (y < 12) {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["d/5"], duration: "q" })] 
//        } else if (y < 18) {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" })] 
//        } else  if (y < 22) {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "q" })] 
//        } else  if (y < 28) {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "q" })] 
//        } else  if (y < 32) {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "q" })] 
//        } else  if (y < 38) {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "q" })] 
//        } else {
//            let notes = [new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" })] 
//        }
//
//        // Create a voice in 1/4 and add above notes
//        let voice = new VF.Voice({num_beats: 1,  beat_value: 4});
//        voice.addTickables(notes)
////        voices.push(voice);
//        // Format and justify the notes to 400 pixels.
//        let formatter = new VF.Formatter().joinVoices(voice).format(voice, 400);
//
//        context.clear();
//		context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
//
//		let x_stave = 10;
//		let y_stave = 0; 
//		// Create a stave of width 400 at position 10, 40 on the canvas.
//		let stave = new VF.Stave(x_stave, y_stave, 400);
//
//		// Add a clef and time signature.
//		stave.addClef("treble").addTimeSignature("4/4");
//
//		// Connect it to the rendering context and draw!
//		stave.setContext(context).draw()
//        // Render voices
//        voices.forEach(function(v) { v.draw(context, stave); })
//  }
//});
