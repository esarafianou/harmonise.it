import { relay } from 'graphql-sequelize'
import { Theme } from '../../database.js'
import { solutionType } from '../types/solutionType'


let themeSolutionConnection
export default () => {
	if (!themeSolutionConnection) {
			themeSolutionConnection = relay.sequelizeConnection({
				name: 'themeSolution',
				nodeType: solutionType,
				target: Theme.Solutions
      })
	}
  return themeSolutionConnection
};

