import { Request, Response } from 'express';
import kuesionerUmkmService from '../services/kuesionerUmkmService';

const create = async (req: Request, res: Response) => {
  try {
    const pclEmail = (req as any).user.email; // Extract email from req.user
    const kuesionerData = { ...req.body, email_pcl: pclEmail };
    const newKuesioner = await kuesionerUmkmService.createKuesionerUmkm(kuesionerData);
    res.status(201).json({
      statusCode: 201,
      message: 'Kuesioner UMKM berhasil dibuat.',
      data: newKuesioner,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const kuesioners = await kuesionerUmkmService.getKuesionerUmkms();
    res.status(200).json({
      statusCode: 200,
      message: 'Daftar kuesioner UMKM berhasil ditampilkan.',
      data: kuesioners,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kuesioner = await kuesionerUmkmService.getKuesionerUmkmById(id);
    res.status(200).json({
      statusCode: 200,
      message: 'Kuesioner UMKM berhasil ditampilkan.',
      data: kuesioner,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const pclEmail = (req as any).user.email; // Extract email from req.user
    const updatedKuesioner = await kuesionerUmkmService.updateKuesionerUmkm(id, updateData, pclEmail);
    res.status(200).json({
      statusCode: 200,
      message: 'Kuesioner UMKM berhasil diupdate.',
      data: updatedKuesioner,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pclEmail = (req as any).user.email; // Extract email from req.user
    await kuesionerUmkmService.deleteKuesionerUmkm(id, pclEmail);
    res.status(200).json({
      statusCode: 200,
      message: 'Kuesioner UMKM berhasil dihapus.',
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};
