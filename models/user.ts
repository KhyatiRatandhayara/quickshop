import { sequelize } from './index.js';
import { DataTypes, Model, Optional } from 'sequelize';
import * as bcrypt from 'bcrypt'; 

const saltRounds = 10;
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}


const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  },{
    hooks: {
      beforeCreate: async (user, options) => {
       const hashedPassword = await bcrypt.hash(user.password, saltRounds);
       user.password = hashedPassword;
      }
    }
  }
 
);

export default User;