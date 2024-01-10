import { User } from "./User.js";
import * as dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";
import { Rule } from "./Rule.js";
import { Version } from "./Version.js";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User(sequelize, DataTypes);
db.rule = Rule(sequelize, DataTypes);
db.version = Version(sequelize, DataTypes);

//associations
db.rule.belongsTo(db.user, { foreignKey: "userId" });
db.user.hasMany(db.rule, { foreignKey: "userId" });

db.rule.hasMany(db.version, { foreignKey: "ruleId" });
db.version.belongsTo(db.rule, { foreignKey: "ruleId" });

export default db;
