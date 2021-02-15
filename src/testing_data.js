import { User, Theme, Connection } from './database.js'

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

let themeData2 = {
  key: 'A',
  tempo: '2/4',
  clef: 'treble',
  voice: [{                  // voice 1, soprano voice
    key: 'c/5',
    duration: 4,
    type: 'note',
    accidental: 'b', // accidental can be one of the following: bb, b, #, ##, n
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
    type: 'note',
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
    type: 'note',
    accidental: '',
    hint: '',
    rank: null
  }]
}

Connection.sync({ force: true }).then(() => {
  return User.create({
    username: 'testUser',
    password: 'mypassword'
  })
  .then((user) => {
    return Theme.create({
      difficulty: 1,
      description: 'Make use only of the I, IV and V steps',
      given_voice: 'soprano',
      theme_data: JSON.stringify(themeData)
    })
    .then(() => {
      return Theme.create({
        difficulty: 2,
        description: 'Make use only of the I, IV and V steps using both the root and the third on the bass voice',
        given_voice: 'soprano',
        theme_data: JSON.stringify(themeData2)
      })
    })
    .then(() => {
      Connection.close()
    })
  })
  .catch((error) => {
    console.log(error)
    Connection.close()
  })
})
