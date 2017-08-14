import { fromGlobalId } from 'graphql-relay'

const types = {}

export const registerType = (model, type, lookupFn) => {
  types[type.name] = { type, model, lookupFn }
}

export const getNodeFromID = globalId => {
  const { type: typeName, id } = fromGlobalId(globalId)

  if (types[typeName]) {
    return types[typeName].lookupFn(id)
  } else {
    return null
  }
}

export const getNodeType = obj => {
  for (let typeName of Object.keys(types)) {
    if (obj instanceof types[typeName].model) {
      return types[typeName].type
    }
  }

  return null
}
