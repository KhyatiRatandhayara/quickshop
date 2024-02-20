import { sequelize } from './index.js';
import { DataTypes, Model, Optional } from 'sequelize';

interface ProductAttributes {
  id: string
  productName: string,
  productPrice: number,
  productRating: number,
  description: string
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
    description: DataTypes.STRING
  }
)
export default Product;