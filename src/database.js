let musicPiece = {
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
      rank: null
    },
    {
      key: 'd/5',
      duration: 4,
      type: 'note',
      editable: true,
      accidental: '',
      hint: '',
      rank: null
    },
    {
      key: 'e/5',
      duration: 4,
      type: 'pause',
      editable: true,
      accidental: '',
      hint: '',
      rank: null
    },
    {
      key: 'd/5',
      duration: 4,
      type: 'note',
      editable: true,
      accidental: 'n',
      hint: '',
      rank: null
    },
    {
      key: 'e/5',
      duration: 4,
      type: 'note',
      editable: true,
      accidental: '',
      hint: '',
      rank: null
    },
    {
      key: 'c/5',
      duration: 2,
      type: 'pause',
      editable: true,
      accidental: '',
      hint: '',
      rank: null
    }],
    [{                  // voice 2, alto voice
      key: 'a/4',
      duration: 4,
      type: 'note',
      editable: false,
      accidental: '',
      hint: '',
      rank: null
    },
    {
      key: 'g/4',
      duration: 4,
      type: 'note',
      editable: true,
      accidental: '',
      hint: '',
      rank: null
    },
    {
      key: 'd/4',
      duration: 2,
      type: 'note',
      editable: true,
      accidental: 'n',
      hint: '',
      rank: null
    },
    {
      key: 'b/4',
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
      key: 'b/4',
      duration: 4,
      type: 'note',
      editable: true,
      accidental: '',
      hint: '',
      rank: null
    }],
    [{                  // voice 3, tenoro voice
      key: 'c/4',
      duration: 4,
      type: 'note',
      editable: false,
      accidental: '',
      hint: '',
      rank: null
    },
    {
      key: 'd/4',
      duration: 4,
      type: 'pause',
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
      key: 'b/3',
      duration: 2,
      type: 'note',
      editable: true,
      accidental: '',
      hint: '',
      rank: null
    },
    {
      key: 'f/4',
      duration: 2,
      type: 'pause',
      editable: true,
      accidental: '',
      hint: '',
      rank: null
    }]]
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
      hint: '6 5# 3',
      rank: 5
    },
    {
      key: 'c/4',
      duration: 2,
      type: 'note',
      editable: true,
      accidental: '',
      hint: '',
      rank: 3
    },
    {
      key: 'b/4',
      duration: 4,
      type: 'note',
      editable: true,
      accidental: '',
      hint: '6 5',
      rank: 4
    },
    {
      key: 'a/4',
      duration: 4,
      type: 'note',
      editable: true,
      accidental: '',
      hint: '6',
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
    }]]
  }]
}

export class MusicPiece {}
export class User {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
const usersById = { 
  [VIEWER_ID]: viewer,
};

// Mock musicPiece data
const musicPiecesById = {};
const musicPiecesIdsByUser = {
  [VIEWER_ID]: [],
};
let nextMusicPieceId = 0;

// Add music Piece
const newMusicPiece = new MusicPiece()
newMusicPiece.id = `${nextMusicPieceId++}`;
newMusicPiece.info = JSON.stringify(musicPiece)
musicPiecesById[newMusicPiece.id] = newMusicPiece;
musicPiecesIdsByUser[VIEWER_ID].push(newMusicPiece.id);

export function getUser(id) {
  return usersById[id];
}

export function getMusicPiece(id) {
  return musicPiecesById[id];
}

export function getMusicPieces() {
	const musicPieces = musicPiecesIdsByUser[VIEWER_ID].map(id => musicPiecesById[id])
  return musicPieces
}

export function getViewer() {
  return getUser(VIEWER_ID);
}
