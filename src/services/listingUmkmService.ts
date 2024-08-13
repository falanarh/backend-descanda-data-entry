import ListingUmkm, { IListingUmkm } from "../models/listingUmkmModel";

const generateKode = async (rt_rw_dusun: string) => {
  const listings = await ListingUmkm.find({ rt_rw_dusun }).sort({ kode: 1 });
  const count = listings.length;
  const nextIndex = count + 1;
  const kode = `${rt_rw_dusun}${nextIndex.toString().padStart(3, "0")}`;
  return kode;
};

const adjustKodes = async (rt_rw_dusun: string) => {
  const listings = await ListingUmkm.find({ rt_rw_dusun }).sort({ kode: 1 });
  for (let i = 0; i < listings.length; i++) {
    const updatedKode = `${rt_rw_dusun}${(i + 1).toString().padStart(3, "0")}`;
    await ListingUmkm.findByIdAndUpdate(listings[i]._id, { kode: updatedKode });
  }
};

const createListingUmkm = async (listingData: {
  rt_rw_dusun: string;
  no_urut_bangunan: string;
  nama_kk_ak_bangunan: string;
  alamat: string;
  is_umkm: boolean;
  email_pcl: string;
}) => {
  const { rt_rw_dusun } = listingData;
  const kode = await generateKode(rt_rw_dusun); // Generate kode
  const newListing = new ListingUmkm({ ...listingData, kode });
  await newListing.save();
  return newListing;
};

const getListingUmkms = async () => {
  return ListingUmkm.find().sort({ kode: 1 });
};

const getListingUmkmById = async (id: string) => {
  const listing = await ListingUmkm.findById(id);
  if (!listing) {
    throw new Error("Listing UMKM tidak ditemukan.");
  }
  return listing;
};

const updateListingUmkm = async (
  id: string,
  updateData: Partial<IListingUmkm>,
  userEmail: string
) => {
  const listing = await ListingUmkm.findById(id);
  if (!listing) {
    throw new Error("Listing UMKM tidak ditemukan.");
  }

  if (listing.email_pcl !== userEmail) {
    throw new Error("Tidak diizinkan untuk mengupdate Listing UMKM ini.");
  }

  const updatedListing = await ListingUmkm.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedListing) {
    throw new Error("Listing UMKM tidak ditemukan.");
  }
  return updatedListing;
};

const deleteListingUmkm = async (id: string, userEmail: string) => {
  const listing = await ListingUmkm.findById(id);
  if (!listing) {
    throw new Error("Listing UMKM tidak ditemukan.");
  }

  if (listing.email_pcl !== userEmail) {
    throw new Error("Tidak diizinkan untuk menghapus Listing UMKM ini.");
  }

  const rt_rw_dusun = listing.rt_rw_dusun;
  const result = await ListingUmkm.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Listing UMKM tidak ditemukan.");
  }

  await adjustKodes(rt_rw_dusun); // Adjust kodes after deletion
  return result;
};

export default {
  createListingUmkm,
  getListingUmkms,
  getListingUmkmById,
  updateListingUmkm,
  deleteListingUmkm,
};
