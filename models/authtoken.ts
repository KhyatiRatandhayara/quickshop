import { sequelize } from './index.js';
import { DataTypes, Model, Optional } from 'sequelize';
import User from './user.js';
import { v4 as uuidv4 } from 'uuid';

interface authTokenAttributes {
  id: number,
  userId: number,
  token: string,
  email: string,
  expiryDate: Date,
};

interface authTokenCreationAttributes extends Optional<authTokenAttributes, 'id'> { }

interface authTokenInstance extends Model<authTokenAttributes, authTokenCreationAttributes>, authTokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
const authToken = sequelize.define<authTokenInstance>('authToken',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    email: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiryDate: DataTypes.DATE
  },
);

/*
   You can omit the sourceKey property
   since by default sequelize will use the primary key defined
   in the model - But I like to be explicit 
 */
authToken.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasOne(authToken, { sourceKey: 'id', foreignKey: 'userId' });

authToken.prototype.createToken = async (user) => {
  let expiredAt = new Date();
  console.log("expiredAt.getSeconds()", expiredAt.getSeconds());

  expiredAt.setSeconds(expiredAt.getSeconds() + Number(process.env.JWT_REFRESH_EXPIRATION));
  let _token = uuidv4();
  let refreshToken = await authToken.create({
    email: user.email,
    token: _token,
    userId: user.id,
    expiryDate: expiredAt,
  });
  return refreshToken.token;
};

authToken.prototype.verifyExpiration = (token) => {
  console.log("token", token)
  return token.expiryDate.getTime() < new Date().getTime();
};


export default authToken;
