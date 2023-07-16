module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'product',
    {
      public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      sku: { type: DataTypes.STRING, allowNull: false , unique: true,},
      price: { type: DataTypes.FLOAT , allowNull: false},
      is_offer_available: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      concurrency_stamp:{  type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false},
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    { freezeTableName: true, underscored: true, timestamps: true },
  );

  product.associate = (models) => {
    product.hasMany(models.offer, {
      foreignKey: 'product_id',
    });
  };

  return product;
};
