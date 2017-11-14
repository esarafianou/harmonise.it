import { fromGlobalId } from 'graphql-relay'

export const resolver = (model) => {
  return (obj, args) => {
    const { type, id } = fromGlobalId(args.id)
    return model.find({
      where: {
        id: id
      }   
    })
  }
}
