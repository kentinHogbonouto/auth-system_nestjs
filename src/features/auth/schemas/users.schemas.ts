import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { schemaForClass } from 'src/helpers/orm/create-schema.orm';
import * as bcrypt from 'bcrypt';
import { randomString } from 'src/helpers/utils/random-string';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  sessionToken: string;

  @Prop()
  password?: string;

  generateSessionToken() {
    this.sessionToken = randomString(60);
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password || '');
  }
}

export const UserSchema = schemaForClass(User);

UserSchema.pre('save', async function (next) {
  const user: User = this as any;

  if (!user.password || user.password.startsWith('$')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt();

    user.password = await bcrypt.hash(user.password, salt);

    next();
  } catch (e) {
    next(e);
  }
});
