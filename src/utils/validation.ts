import { IsBase64, IsString, IsNotEmpty, IsIn } from "class-validator";
import { validateSync } from "class-validator";

class UploadRequest {
  @IsBase64()
  image!: string;

  @IsString()
  @IsNotEmpty()
  customer_code!: string;

  @IsString()
  @IsNotEmpty()
  measure_datetime!: string;

  @IsString()
  @IsIn(["WATER", "GAS"])
  measure_type!: string;
}

export const validateUploadRequest = (body: any): string[] => {
  const request = new UploadRequest();
  Object.assign(request, body);

  const errors = validateSync(request);

  if (errors.length > 0) {
    return errors.map((err: any) =>
      Object.values(err.constraints || {}).join(", ")
    );
  }

  return [];
};
