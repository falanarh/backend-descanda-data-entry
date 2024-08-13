import { Request, Response } from 'express';
import listingUmkmService from '../services/listingUmkmService';

const create = async (req: Request, res: Response) => {
  try {
    const userEmail = (req as any).user.email; // Extract email from req.user
    const listingData = { ...req.body, email_pcl: userEmail }; // Add email_pcl to listingData
    const newListing = await listingUmkmService.createListingUmkm(listingData);
    res.status(201).json({
      statusCode: 201,
      message: 'Listing UMKM berhasil dibuat.',
      data: newListing,
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
    const listings = await listingUmkmService.getListingUmkms();
    res.status(200).json({
      statusCode: 200,
      message: 'Daftar listing UMKM berhasil ditampilkan.',
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const getUmkmListings = async (req: Request, res: Response) => {
    try {
      const listings = await listingUmkmService.getUmkmListings();
      res.status(200).json({
        statusCode: 200,
        message: 'Daftar listing UMKM yang valid berhasil ditampilkan.',
        data: listings,
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
    const listing = await listingUmkmService.getListingUmkmById(id);
    res.status(200).json({
      statusCode: 200,
      message: 'Listing UMKM berhasil ditampilkan.',
      data: listing,
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
    const userEmail = (req as any).user.email; // Extract email from req.user
    const updatedListing = await listingUmkmService.updateListingUmkm(id, updateData, userEmail);
    res.status(200).json({
      statusCode: 200,
      message: 'Listing UMKM berhasil diupdate.',
      data: updatedListing,
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
    const userEmail = (req as any).user.email; // Extract email from req.user
    await listingUmkmService.deleteListingUmkm(id, userEmail);
    res.status(200).json({
      statusCode: 200,
      message: 'Listing UMKM berhasil dihapus.',
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
  getUmkmListings,
  getById,
  update,
  remove,
};
