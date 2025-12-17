
//TOKEN SİFRE KONTROLÜ VE NEREYE ARANACAĞINI BULMA

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({

            //TOKENİN NEREDEN GELECEĞİ
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),

            //SÜRESİ DOLMUŞŞSA KABUL ETME (1 SAAT)
            ignoreExpiration:false,

            secretOrKey:'ca117fa4'
        });
    }

//asenkron
    async validate(payload: any){
        
        //tokenin içindeki veriyi(Payload) requeste ulaştırır

        //req.user ile  id ve mailine bakılabilir

        return{userId:payload.sub,emali:payload.email,role:payload.role}
    }
}