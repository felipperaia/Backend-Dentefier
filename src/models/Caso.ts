// src/models/Caso.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICaso extends Document {
  numeroCaso: string;
  titulo: string;
  dataAbertura: Date;
  responsavel: Types.ObjectId;
  status: 'Em andamento' | 'Finalizado' | 'Arquivado';
  contexto: {
    tipoCaso: string;
    origemDemanda: string;
    descricao: string;
  };
  dadosIndividuo: {
    nome?: string;
    idadeEstimado?: number;
    sexo?: string;
    etnia?: string;
    identificadores?: string;
    antecedentes?: string;
  };
  cadeiaCustodia: {
    dataColeta?: Date;
    responsavelColeta?: string;
  };
  historico: Array<{
    data: Date;
    responsavel: string;
    justificativa: string;
    substatus?: string;
  }>;
  localizacao?: {
    lat: number;
    lng: number;
    enderecoCompleto?: string;
  };
  vitimas: Types.ObjectId[];
}

const CasoSchema = new Schema<ICaso>(
  {
    numeroCaso:   { type: String, required: true, unique: true },
    titulo:       { type: String, required: true },
    dataAbertura: { type: Date,   required: true },
    responsavel: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status:       { type: String, enum: ['Em andamento', 'Finalizado', 'Arquivado'], required: true },
    contexto: {
      tipoCaso:      { type: String, required: true },
      origemDemanda: { type: String, required: true },
      descricao:     { type: String, required: true }
    },
    dadosIndividuo: {
      nome:            { type: String },
      idadeEstimado:   { type: Number },
      sexo:            { type: String },
      etnia:           { type: String },
      identificadores:{ type: String },
      antecedentes:     { type: String }
    },
    cadeiaCustodia: {
      dataColeta:      { type: Date },
      responsavelColeta:{ type: String }
    },
    historico: [
      {
        data:          { type: Date },
        responsavel:   { type: String },
        justificativa:{ type: String },
        substatus:     { type: String }
      }
    ],
    localizacao: {
      lat:             { type: Number },
      lng:             { type: Number },
      enderecoCompleto:{ type: String }
    },
    vitimas: [
      { type: Schema.Types.ObjectId, ref: 'Vitima', required: true }
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICaso>('Caso', CasoSchema);