import * as bcrypt from 'bcrypt';
export async function generatePassword(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
