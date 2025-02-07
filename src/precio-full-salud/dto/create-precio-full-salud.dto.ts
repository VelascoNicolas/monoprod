import { IsInt, IsNumber, IsPositive } from "class-validator";

export class CreatePrecioFullSaludDto {
    @IsInt()
    productoId: number;

    @IsNumber()
    @IsPositive()
    precioDescuento: number;

    // @IsBoolean()
    // @IsOptional()
    // available?: boolean = true;

}
