// src/controllers/vitimaController.ts
import { Request, Response } from 'express';
import Vitima from '../models/Vitima';

export const createVitima = async (req: Request, res: Response) => {
  try {
    const nova = new Vitima(req.body);
    await nova.save();
    res.status(201).json({ message: 'Vítima criada com sucesso', vitima: nova });
  } catch (error) {
    console.error('Erro ao criar vítima:', error);
    res.status(500).json({ message: 'Erro ao criar vítima', error });
  }
};

export const listVitimas = async (_req: Request, res: Response) => {
  try {
    const vitimas = await Vitima.find();
    res.json(vitimas);
  } catch (error) {
    console.error('Erro ao listar vítimas:', error);
    res.status(500).json({ message: 'Erro ao listar vítimas', error });
  }
};

export const getVitimaById = async (req: Request, res: Response) => {
  try {
    const vitima = await Vitima.findById(req.params.id);
    if (!vitima) {
      return res.status(404).json({ message: 'Vítima não encontrada' });
    }
    res.json(vitima);
  } catch (error) {
    console.error('Erro ao obter vítima:', error);
    res.status(500).json({ message: 'Erro ao obter vítima', error });
  }
};

export const updateVitima = async (req: Request, res: Response) => {
  try {
    const updated = await Vitima.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Vítima atualizada', vitima: updated });
  } catch (error) {
    console.error('Erro ao atualizar vítima:', error);
    res.status(500).json({ message: 'Erro ao atualizar vítima', error });
  }
};

export const deleteVitima = async (req: Request, res: Response) => {
  try {
    await Vitima.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vítima excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir vítima:', error);
    res.status(500).json({ message: 'Erro ao excluir vítima', error });
  }
};
