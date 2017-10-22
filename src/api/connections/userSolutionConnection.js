import { solutionType } from '../types/solutionType'
import { relay } from 'graphql-sequelize'
import { User } from '../../database.js'


let userSolutionConnection
export default () => {
  if (!userSolutionConnection) {
		userSolutionConnection = relay.sequelizeConnection({
			name: 'userSolution',
			nodeType: solutionType,
			target: User.Solutions
    })  
  }
  return userSolutionConnection
};

