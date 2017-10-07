import { Sequelize } from 'sequelize'

let musicPieceInfo = {
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

const Connection = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
)

const User = Connection.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const MusicPiece = Connection.define('musicpiece', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

User.hasMany(MusicPiece)

Connection.sync({ force: true }).then(() => {
  return User.create({
    userName: 'testUser',
	})
  .then((user) => {
    return MusicPiece.create({
			content: JSON.stringify(musicPieceInfo)
    })
    .then((musicpiece) => {
      return user.setMusicpieces(musicpiece)
		})
  })
})

export default Connection
