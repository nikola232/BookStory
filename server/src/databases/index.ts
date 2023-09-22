import Sequelize from 'sequelize';
import UserModel from '@/models/users.model';
import BookModel from '@/models/book.model';

// Initialize and configure Sequelize
const sequelize = new Sequelize.Sequelize('TestDB', 'sa', 'Test123@', {
  host: 'localhost',
  dialect: 'mssql', // Use 'mssql' for SQL Server
  define: {
    timestamps: true,
    underscored: true, // Use underscored field names (e.g., created_at) instead of camelCase (createdAt)
  },
});

try {
  sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (err) {
  console.error('Unable to connect to the database:', err);
}

export const DB: any = {
  Books: BookModel(sequelize),
  User: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};