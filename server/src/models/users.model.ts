
import { UserInterface } from '@interfaces/users.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

// Define your Sequelize model
class UserModel extends Model<UserInterface> implements UserInterface {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
}

/**
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 * */
export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey:    true,
        allowNull:     false,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize, // Pass the Sequelize instance
      modelName: 'User', // Set the model name
      tableName: 'users', // Set the table name (optional)
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  );

  return UserModel;
}