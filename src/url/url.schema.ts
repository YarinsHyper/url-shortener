import { Schema, Document } from 'mongoose';

export interface Url extends Document {
  originalUrl: string;
  shortUrl: string;
}

export const UrlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
});
