import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface do Usuário
export interface IUser extends Document {
  username: string;
  password: string;
  role: 'admin' | 'perito' | 'assistente';
  email: string;
  phone?: string;
  department?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Esquema do Usuário
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'O nome de usuário é obrigatório'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'A senha é obrigatória'],
      minlength: [8, 'A senha deve ter pelo menos 8 caracteres'],
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'perito', 'assistente'],
      required: [true, 'O papel do usuário é obrigatório']
    },
    email: {
      type: String,
      required: [true, 'O e-mail é obrigatório'],
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    department: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Hash da senha antes de salvar
UserSchema.pre<IUser>('save', async function (next: (err?: CallbackError) => void) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

// Método para comparar a senha
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
