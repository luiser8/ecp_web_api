import fs from 'fs';
import dotenv from 'dotenv';
import '../config/database.js';
import Role from '../models/role.js';
import User from '../models/user.js';
import Unit from '../models/unit.js';

dotenv.config();

const roles = JSON.parse(fs.readFileSync(new URL('data/role.json', import.meta.url), 'utf-8'));
const users = JSON.parse(fs.readFileSync(new URL('data/users.json', import.meta.url), 'utf-8'));
const units = JSON.parse(fs.readFileSync(new URL('data/units.json', import.meta.url), 'utf-8'));

try {
    await Role.create(roles);
    await User.create(users);
    await Unit.create(units);
    process.exit();
} catch (err) {
    console.error(err);
}
