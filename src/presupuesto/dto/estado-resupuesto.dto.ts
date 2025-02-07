import { IsEnum, IsNumber, IsString } from "class-validator";
import { EstadoPresupuesto } from "@prisma/client";

export class estadoPresupuestoDto{
    @IsNumber()
    id: number;

    // @IsEnum(estadoPresupuestoList, {
    //     message: `Valid status are: ${estadoPresupuestoList}`
    // })
    // estado: EstadoPresupuesto;
    @IsString()
    public estado: EstadoPresupuesto
}