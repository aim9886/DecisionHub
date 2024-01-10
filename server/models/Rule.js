
export const Rule = (sequelize, DataTypes) => {
  const Rule = sequelize.define(
    "rule",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inputAttributes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      outputAttributes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      condition: {
        type: DataTypes.JSON,
        defaultValue: { nodes: [], edges: [] },
      },
      version: {
        type: DataTypes.FLOAT,
        defaultValue: 1.0,
      },
    },
    { timestamps: true }
  );
  return Rule;
};
