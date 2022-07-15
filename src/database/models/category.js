const createCategory = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
  });

  Category.associate = (models) => {
    Category.hasOne(models.PostCategory, {
      foreignKey: 'categoryId',
      as: 'categories',
    });
  };

  return Category;
};

module.exports = createCategory;