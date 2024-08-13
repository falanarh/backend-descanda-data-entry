import mongoose, { Document, Schema } from 'mongoose';

interface IListingUmkm extends Document {
  rt_rw_dusun: string;
  no_urut_bangunan: string;
  nama_kk_ak_bangunan: string;
  alamat: string;
  is_umkm: boolean;
  email_pcl: string;
  kode: string; // Add kode property
}

const ListingUmkmSchema: Schema = new Schema({
  rt_rw_dusun: { type: String, required: true },
  no_urut_bangunan: { type: String, required: true },
  nama_kk_ak_bangunan: { type: String, required: true },
  alamat: { type: String, required: true },
  is_umkm: { type: Boolean, default: false },
  email_pcl: { type: String, required: true },
  kode: { type: String, required: true, unique: true }, // Add kode field
});

export { IListingUmkm };
export default mongoose.model<IListingUmkm>('ListingUmkm', ListingUmkmSchema);
