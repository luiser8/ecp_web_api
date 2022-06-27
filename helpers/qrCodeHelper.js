import QRCode from 'qrcode';

export const qrCodeHelper = async (value) => {

    return await QRCode.toDataURL(value);
}
