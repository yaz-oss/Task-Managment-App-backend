const { Sequelize } =
require("sequelize");

const sequelize =
new Sequelize(
  "postgresql://neondb_owner:npg_QtALO1YIDqg3@ep-late-sea-ab30awom-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  {
    dialect: "postgres",

    protocol: "postgres",

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

    logging: false,
  }
);

module.exports =
sequelize;