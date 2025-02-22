import { IsString, IsPhoneNumber, Length } from 'class-validator';

export class WebhookMessageDto {
  @IsString()
  @Length(1, 500)
  message: string;

  @IsPhoneNumber()
  phone: string;
}
