import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const hashedPassword = async (password) => { 

  const saltRounds = 10;

  try { 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword)
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}
hashedPassword("hadi4234")

console.log(randomUUID())
