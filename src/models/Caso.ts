import mongoose, { Schema, Document } from 'mongoose';

export interface ICaso extends Document {
  numeroCaso: string;
  titulo: string;
  dataAbertura: Date;
  responsavel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  };
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
    justificativa: string;
    substatus?: string;
  }>;
  localizacao?: {
    lat: number;
    lng: number;
    enderecoCompleto?: string;
  };
}

const CasoSchema: Schema = new Schema({
  numeroCaso:   { type: String, required: true, unique: true },
  titulo:       { type: String, required: true },
  dataAbertura: { type: Date,   required: true },
  responsavel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    status:       { type: String, enum: ['Em andamento', 'Finalizado', 'Arquivado'], required: true },
  contexto: {
    tipoCaso:     { type: String, required: true },
    origemDemanda:{ type: String, required: true },
    descricao:    { type: String, required: true }
  },
  dadosIndividuo: {
    nome:          { type: String },
    idadeEstimado: { type: Number },
    sexo:          { type: String },
    etnia:         { type: String },
    identificadores: { type: String },
    antecedentes:  { type: String }
  },
  cadeiaCustodia: {
    dataColeta:      { type: Date },
    responsavelColeta:{ type: String }
  },
  historico: [
    {
      data:         { type: Date },
      responsavel:  { type: String },
      justificativa:{ type: String },
      substatus:    { type: String }
    }
  ],
  localizacao: {
    lat:             { type: Number },
    lng:             { type: Number },
    enderecoCompleto:{ type: String }
  }
}, {
  timestamps: true
});

export default mongoose.model<ICaso>('Caso', CasoSchema);
