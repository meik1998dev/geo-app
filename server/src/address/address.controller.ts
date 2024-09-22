import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AddressService } from './address.service';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private configService: ConfigService,
  ) {}

  @Post('geolocation')
  async getGeolocation(
    @Body('address') address: string,
    @Body('email') email: string,
    @Res() res: Response,
  ) {
    try {
      let addressRecord = await this.addressService.findByAddress(address);

      if (!addressRecord) {
        addressRecord = await this.addressService.createAddress(address);
      }

      if (email) {
        await this.sendGeolocationEmail(
          email,
          addressRecord.address,
          addressRecord.geolocation.latitude,
          addressRecord.geolocation.longitude,
        );
      }

      return res.json({
        address: addressRecord.address,
        geolocation: addressRecord.geolocation,
      });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  private async sendGeolocationEmail(
    email: string,
    address: string,
    latitude: number,
    longitude: number,
  ) {
    console.log(process.env.GMAIL_USERNAME);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USERNAME'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: `Geolocation Results for ${address}`,
      text: `The geolocation for ${address} is:\nLatitude: ${latitude}\nLongitude: ${longitude}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
