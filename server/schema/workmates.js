/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workmates', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(8),
      allowNull: false
    },
    sex: {
      type: DataTypes.CHAR(4),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    telphone: {
      type: DataTypes.CHAR(13),
      allowNull: true
    },
    address: {
      type: DataTypes.CHAR(60),
      allowNull: true
    },
    des: {
      type: DataTypes.CHAR(16),
      allowNull: true
    }
  }, {
    tableName: 'workmates'
  });
};
