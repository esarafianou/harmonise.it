import { Sequelize } from 'sequelize'

const Connection = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost',
    operatorsAliases: false
  }
)

const User = Connection.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Theme = Connection.define('theme', {
  difficulty: Sequelize.STRING,
  description: Sequelize.TEXT,
  given_voice: Sequelize.STRING,
  theme_data: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

const ThemeSolution = Connection.define('theme_solution', {
  solution_data: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

User.Solutions = User.belongsToMany(Theme, { through: ThemeSolution, as: 'solutions' })
Theme.Solutions = Theme.belongsToMany(User, { through: ThemeSolution, as: 'solutions' })

export { Theme, User, ThemeSolution }
export default Connection
