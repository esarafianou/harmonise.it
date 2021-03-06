import { Sequelize } from 'sequelize'

const database = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/postgres'

const Connection = new Sequelize(
  database,
  { operatorsAliases: false }

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
}, {
  scopes: {
    authorized: function (value) {
      return {
        where: {
          userId: value
        }
      }
    }
  }
})

User.Solutions = User.hasMany(ThemeSolution)
Theme.Solutions = Theme.hasMany(ThemeSolution)

export { Theme, User, ThemeSolution, Connection }
