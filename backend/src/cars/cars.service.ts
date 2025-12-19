import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FindCarsDto } from './dto/find-cars.dto';

@Injectable()

export class CarService{

  constructor(private prisma:PrismaService) {}


  //EKLE
// --- CREATE (EKLEME) FONKSİYONU ---
  async create(createCarDto: CreateCarDto) {
    
    // 1. ADIM: Gelen veriyi iki parçaya ayırıyoruz (Destructuring).
    // featureIds: Sadece ID listesini al (Örn: [1, 3]).
    // carData: Arabanın geri kalan tüm bilgilerini (marka, model vb.) al.
    const { featureIds, ...carData } = createCarDto;

    // 2. ADIM: Veritabanına kaydet.
    return this.prisma.car.create({
      data: {
        ...carData, // Araba bilgilerini olduğu gibi yaz.
        
        // --- İLİŞKİ KURMA (MANY-TO-MANY) ---
        features: {
          // 'connect': Var olan kayıtları bağla demektir.
          // map fonksiyonu ile [1, 3] listesini şu hale çeviriyoruz:
          // [{ id: 1 }, { id: 3 }] -> Prisma bu formatı ister.
          connect: featureIds?.map((id) => ({ id })), 
        },
      },
      // Kaydettikten sonra cevap olarak özellikleri de göster.
      include: { features: true }, 
    });
  }
// LİSTELEME (filtre ve sıralama)
// --- FIND ALL (LİSTELEME) FONKSİYONU ---
  async findAll() {
    return this.prisma.car.findMany({
      orderBy: { id: 'desc' }, // En son eklenen en üstte.
      // Arabaları listelerken içindeki özellikleri de görmek istiyoruz.
      include: { features: true }, 
    });
  }

  //ARA
  findOne(id:number){
    return this.prisma.car.findUnique({where:{id}});
  }

  //GÜNCELLE
  update(id:number,dto:UpdateCarDto){
    return this.prisma.car.update({where:{id},data:dto});
  }

  //SİL
  remove(id:number){

    return this.prisma.car.delete({where:{id}})
  }


}
 