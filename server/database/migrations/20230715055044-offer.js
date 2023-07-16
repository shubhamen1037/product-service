const { OFFER_STATUS } = require('../../utils/constant');

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('offer', {
    id: {
      type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
    },
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
    concurrency_stamp:{  type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false},
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  })
  .then(() => queryInterface.addIndex('offer', [ 'public_id' ]))
  .then(() => queryInterface.addIndex('offer', [ 'product_id' ]))
  .then(() => queryInterface.addIndex('offer', [ 'status' ])),

  down: (queryInterface) => queryInterface.dropTable('offer'),
};
