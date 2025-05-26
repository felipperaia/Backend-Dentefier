// src/models/Vitima.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IVitima extends Document {
  nic: string;
  nome: string;
  genero: string;
  idade: number;
  documento: string;
  endereco: string;
  corEtnia: string;
  odontograma: {
    anotacao: string;
  };
  regioesAnatomicas: string[];
}

const VitimaSchema = new Schema<IVitima>(
  {
    nic: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    genero: { type: String, required: true },
    idade: { type: Number, required: true },
    documento: { type: String, required: true },
    endereco: { type: String, required: true },
    corEtnia: { type: String, required: true },
    odontograma: {
      anotacao: { type: String, required: true },
    },
    regioesAnatomicas: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default model<IVitima>('Vitima', VitimaSchema);