import { BookInterface } from '@interfaces/book.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Define your Sequelize model
class BookModel extends Model<BookInterface> implements BookInterface {
  public id!: number;
  public title!: string;
  public author!: string;
  public isbn!: number;
}

/**
 * @swagger
 * definitions:
 *  Book:
 *      type: object
 *      properties:
 *          title:
 *              type: string
 *              required: true
 *          author:
 *              type: string
 *              required: true
 *          isbn:
 *              type: number
 *              required: true
 * */
export default function (sequelize: Sequelize): typeof BookModel {
  BookModel.init(
    {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        primaryKey:    true,
        allowNull:     false,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isbn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize, // Pass the Sequelize instance
      modelName: 'Book', // Set the model name
      tableName: 'books', // Set the table name (optional)
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  );
  return BookModel;
}