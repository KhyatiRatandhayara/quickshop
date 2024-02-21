'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      productName: {
        type: Sequelize.STRING
      },
      productPrice: {
        type: Sequelize.FLOAT
      },
      productRating: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};