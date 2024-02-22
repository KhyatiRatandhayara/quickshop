import { sequelize } from './index.js';
import { DataTypes, Model, Optional } from 'sequelize';
import User from './user.js';

interface ProductAttributes {
  id: number
  productName: string,
  productPrice: number,
  productRating: number,
  description: string;
  userId: string
};

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

export interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
const Product = sequelize.define<ProductInstance>(
  'Product',{
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    productName: DataTypes.STRING,
    productPrice: DataTypes.FLOAT,
    productRating: DataTypes.FLOAT,
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // <<< Note, its table's name, not object name
        key: 'id' // <<< Note, its a column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' // record in the parent table (the table being referenced by the foreign key) is deleted, the corresponding records in the child table (the table containing the foreign key) will also be automatically deleted.
    },
  }
)

// Establishing the one-to-many association
Product.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId' });

export default Product;