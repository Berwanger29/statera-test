import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';


@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}
    @Post()
    create(@Body() createOrderDto: CreateOrderDto){
        return this.orderService.create(createOrderDto)
    }

    @Get()
    findAll(){
        return this.orderService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.orderService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() UpdateOrderDto: UpdateOrderDto){
        return this.orderService.update(id, UpdateOrderDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.orderService.remove(id)
    }
}
