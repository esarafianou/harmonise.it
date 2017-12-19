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
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Theme = Connection.define('theme', {
  difficulty: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  given_voice: Sequelize.STRING,
  theme_data: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

const ThemeSolution = Connection.define('theme_solution', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solution_data: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

User.Solutions = User.hasMany(ThemeSolution)
Theme.Solutions = Theme.hasMany(ThemeSolution)

export { Theme, User, ThemeSolution, Connection }
