import mongoose, { Document, Schema } from "mongoose";

interface IKuesionerUmkm extends Document {
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
  email_pcl: string; // Added email property
  catatan: string;
}

const KuesionerUmkmSchema: Schema = new Schema({
  kode: { type: String, required: true, unique: true },
  rt_rw_dusun: { type: String, required: true },
  nama_kepala_keluarga: { type: String, required: true },
  no_urut_bangunan: { type: String, required: true },
  alamat: { type: String, required: true },
  nama_usaha: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  nama_pemilik_penanggungjawab: { type: String, required: true },
  jenis_kelamin: {
    type: String,
    enum: ["laki-laki", "perempuan"],
    required: true,
  },
  tanggal_lahir: { type: String, required: true },
  nik: { type: String, required: true },
  no_hp: { type: String, required: true },
  pendidikan_terakhir: { type: String, required: true },
  kategori_usaha: { type: String, required: true },
  kegiatan_utama_usaha: { type: String, required: true },
  bentuk_badan_usaha: { type: String, required: true },
  lokasi_tempat_usaha: { type: String, required: true },
  skala_usaha: { type: String, required: true },
  email_pcl: { type: String, required: true }, // Added email property
  catatan: { type: String },
});

KuesionerUmkmSchema.index({ rt_rw_dusun: 1, no_urut_bangunan: 1 });

export { IKuesionerUmkm };
export default mongoose.model<IKuesionerUmkm>(
  "KuesionerUmkm",
  KuesionerUmkmSchema
);
