import { User, Theme, ThemeSoltuion } from './database.js'
import Connection from './database.js'

let themeData = {
  key: 'A',
  tempo: '2/4',
  clef: 'treble',
  voice: [{                  // voice 1, soprano voice
    key: 'c/5',
    duration: 2,
    type: 'note',
    accidental: 'b', // accidental can be one of the following: bb, b, #, ##, n
    hint: '',
    rank: null
  },
  {
    key: 'd/5',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'e/5',
    duration: 4,
    type: 'pause',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'd/5',
    duration: 4,
    type: 'note',
    accidental: 'n',
    hint: '',
    rank: null
  },
  {
    key: 'e/5',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'c/5',
    duration: 2,
    type: 'pause',
    accidental: '',
    hint: '',
    rank: null
  }]
}

let themeSolutionData = {
  voices: [[{                  // voice 2, alto voice
    key: 'a/4',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'g/4',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'd/4',
    duration: 2,
    type: 'note',
    accidental: 'n',
    hint: '',
    rank: null
  },
  {
    key: 'b/4',
    duration: 2,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'b/4',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'b/4',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  }],
  [{                  // voice 3, tenoro voice
    key: 'c/4',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'd/4',
    duration: 4,
    type: 'pause',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'c/4',
    duration: 2,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'b/3',
    duration: 2,
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  },
  {
    key: 'f/4',
    duration: 2,
    type: 'pause',
    accidental: '',
    hint: '',
    rank: null
  }],
  [{
    key: 'f/4',
    duration: 4,
    type: 'note',
    accidental: 'b',
    hint: '',
    rank: 1
  },
  {
    key: 'd/4',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '6 5# 3',
    rank: 5
  },
  {
    key: 'c/4',
    duration: 2,
    type: 'note',
    accidental: '',
    hint: '',
    rank: 3
  },
  {
    key: 'b/4',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '6 5',
    rank: 4
  },
  {
    key: 'a/4',
    duration: 4,
    type: 'note',
    accidental: '',
    hint: '6',
    rank: 5
  },
  {
    key: 'e/4',
    duration: 2,
    type: 'note',
    accidental: '',
    hint: '',
    rank: 1
  }]]
}

Connection.sync({ force: true }).then(() => {
  return User.create({
    name: 'testUser',
	})
  .then((user) => {
    return Theme.create({
      difficulty: 1,
      description: 'first theme',
      given_voice: 'soprano',
      theme_data: JSON.stringify(themeData)
    })
    .then(() => {
      return Theme.create({
        difficulty: 2,
        description: 'second theme',
        given_voice: 'soprano',
        theme_data: JSON.stringify(themeData)
      })
    })
  })
  .catch((error) => {
    console.log(error)
  })
})
