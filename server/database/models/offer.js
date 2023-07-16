const { OFFER_STATUS } = require("../../utils/constant");

module.exports = (sequelize, DataTypes) => {
  const offer = sequelize.define(
    'offer',
    {
      public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'product',
          key: 'id',
        },
        name: 'product_id_foreign_idx',
      },
      title: { type: DataTypes.STRING, allowNull: false },
      discription: { type: DataTypes.STRING, allowNull: false },
      rule: { type: DataTypes.JSONB },
      status: { type: DataTypes.STRING, defaultValue: OFFER_STATUS.INACTIVE },
      start_date: { type: DataTypes.DATE, allowNull: false },
      end_date: { type: DataTypes.DATE, allowNull: false },
      is_expired: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      concurrency_stamp:{  type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false},
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    { freezeTableName: true, underscored: true, timestamps: true },
  );

  offer.associate = (models) => {
    offer.belongsTo(models.product, {
      foreignKey: 'product_id',
    });
  };

  return offer;
};
