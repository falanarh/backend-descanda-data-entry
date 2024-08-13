import KuesionerUmkm, { IKuesionerUmkm } from "../models/kuesionerUmkmModel";
import ListingUmkm from "../models/listingUmkmModel";

const createKuesionerUmkm = async (kuesionerData: {
    kode: string;
    rt_rw_dusun: string;
    nama_kepala_keluarga: string;
    no_urut_bangunan: string;
    alamat: string;
    nama_usaha: string;
    latitude: string;
    longitude: string;
    nama_pemilik_penanggungjawab: string;
    jenis_kelamin: "laki-laki" | "perempuan";
    tanggal_lahir: string;
    nik: string;
    no_hp: string;
    pendidikan_terakhir: string;
    kategori_usaha: string;
    kegiatan_utama_usaha: string;
    bentuk_badan_usaha: string;
    lokasi_tempat_usaha: string;
    skala_usaha: string;
    email_pcl: string;
  }) => {
    // Check if the listing with the provided kode exists
    const listing = await ListingUmkm.findOne({ kode: kuesionerData.kode });
    
    if (!listing) {
      throw new Error('Listing UMKM dengan kode yang diberikan tidak ditemukan.');
    }
  
    const newKuesioner = new KuesionerUmkm(kuesionerData);
    await newKuesioner.save();
    return newKuesioner;
  };

const getKuesionerUmkms = async () => {
  return KuesionerUmkm.find().sort({ kode: 1 });
};

const getKuesionerUmkmById = async (id: string) => {
  const kuesioner = await KuesionerUmkm.findById(id);
  if (!kuesioner) {
    throw new Error("UMKM tidak ditemukan.");
  }
  return kuesioner;
};

const updateKuesionerUmkm = async (
  id: string,
  updateData: Partial<IKuesionerUmkm>,
  pclEmail: string
) => {
  const kuesioner = await KuesionerUmkm.findById(id);
  if (!kuesioner) {
    throw new Error("Kuesioner UMKM tidak ditemukan.");
  }

  if (kuesioner.email_pcl !== pclEmail) {
    throw new Error("Tidak diizinkan untuk mengupdate Kuesioner UMKM ini.");
  }

  const updatedKuesioner = await KuesionerUmkm.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );
  if (!updatedKuesioner) {
    throw new Error("Kuesioner UMKM tidak ditemukan.");
  }
  return updatedKuesioner;
};

const deleteKuesionerUmkm = async (id: string, pclEmail: string) => {
  const kuesioner = await KuesionerUmkm.findById(id);
  if (!kuesioner) {
    throw new Error("Kuesioner UMKM tidak ditemukan.");
  }

  if (kuesioner.email_pcl !== pclEmail) {
    throw new Error("Tidak diizinkan untuk menghapus Kuesioner UMKM ini.");
  }

  const result = await KuesionerUmkm.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Kuesioner UMKM tidak ditemukan.");
  }
  return result;
};

export default {
  createKuesionerUmkm,
  getKuesionerUmkms,
  getKuesionerUmkmById,
  updateKuesionerUmkm,
  deleteKuesionerUmkm,
};
