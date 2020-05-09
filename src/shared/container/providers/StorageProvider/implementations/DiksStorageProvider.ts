import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string>{

        await fs.promises.rename(
            path.resolve(uploadConfig.directory, file),
            path.resolve(uploadConfig.directory,'uploads', file),
        );

        return file;
    };

    public async deleteFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.directory, 'uploads', file);

        try{
            await fs.promises.stat(filePath); //ele traz informações sobre o arquivo
        }catch(err){
            return;
        }

        await fs.promises.unlink(filePath);
    };
}


export default DiskStorageProvider;