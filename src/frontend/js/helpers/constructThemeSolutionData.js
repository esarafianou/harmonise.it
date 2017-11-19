export const constructThemeSolutionData = (themeData, solutionData, givenVoice) =>  {
  let themeSolutionData = {}
  themeSolutionData.key = themeData.key
  themeSolutionData.tempo = themeData.tempo
  let trebleStaveVoices = []
  let clefStaveVoices = []
  if (givenVoice ===  'soprano') {
    trebleStaveVoices.push(themeData.voice)
    trebleStaveVoices.push(solutionData[0], solutionData[1])
    clefStaveVoices.push(solutionData[2])
  } else {
    trebleStaveVoices = solutionData 
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
