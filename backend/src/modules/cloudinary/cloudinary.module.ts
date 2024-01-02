import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { Cloudinary } from './cloudinary';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {}
