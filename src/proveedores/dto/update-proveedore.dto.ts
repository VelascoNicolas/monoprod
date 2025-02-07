import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProveedoreDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  telefono: string;
}
