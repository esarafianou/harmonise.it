export const constructThemeSolutionData = (themeData, solutionData, givenVoice) => {
  let themeSolutionData = {}
  themeSolutionData.key = themeData.key
  themeSolutionData.tempo = themeData.tempo
  let trebleStaveVoices = []
  let clefStaveVoices = []
  if (givenVoice === 'soprano') {
    trebleStaveVoices.push(themeData.voice)
    trebleStaveVoices.push(solutionData.alto, solutionData.tenoro)
    clefStaveVoices.push(solutionData.bass)
  } else {
    trebleStaveVoices.push(solutionData.soprano, solutionData.alto, solutionData.tenoro)
    clefStaveVoices.push(themeData.voice)
  }
  let staves = []
  let trebleStave = {}
  let clefStave = {}
  trebleStave.clef = 'treble'
  trebleStave.voices = trebleStaveVoices
  clefStave.clef = 'bass'
  clefStave.voices = clefStaveVoices
  staves.push(trebleStave, clefStave)
  themeSolutionData.staves = staves
  return themeSolutionData
}
