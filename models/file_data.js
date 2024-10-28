const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const File_Data = sequelize.define(
    "File_Data",
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orig_filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "File_Data",
    }
  );

  return File_Data; 
};
