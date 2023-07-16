module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('product', {
    id: {
      type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
    },
    public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    concurrency_stamp: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  })
    .then(() => queryInterface.addIndex('product', [ 'public_id' ]))
    .then(() => queryInterface.addIndex('product', [ 'is_deleted' ])),

  down: (queryInterface) => queryInterface.dropTable('product'),
};
