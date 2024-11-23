import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Che ti zdes` zabyl? Idi delai zadanie!';
  }
}
