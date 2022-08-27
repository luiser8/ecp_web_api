import dotenv from 'dotenv';
import '../config/database.js';
import Role from '../models/role.js';
import User from '../models/user.js';
import Unit from '../models/unit.js';

dotenv.config();

try {
    await Role.deleteMany();
    await User.deleteMany();
    await Unit.deleteMany();
    process.exit();
} catch (err) {
    console.error(err);
}
