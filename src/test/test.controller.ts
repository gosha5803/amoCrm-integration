import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import {firstValueFrom} from 'rxjs'
import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/INterceptors/logging.interceptor';


@Controller('test')
export class TestController {
    constructor(private http: HttpService) {}

    @Get()
    @UseInterceptors(TransformInterceptor)
    async testGet() {
        const { data } = await firstValueFrom(
            this.http.get<any>('https://jsonplaceholder.typicode.com/userss')
        )
    }

    @Get('s')
    test2() {
        return 'sasas'
    }
}
