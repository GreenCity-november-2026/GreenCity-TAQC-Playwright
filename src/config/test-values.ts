import dotenv from 'dotenv';

dotenv.config({ quiet: true });

function read(name: string, fallback = ''): string {
  const value = process.env[name];
  return value === undefined || value === '' ? fallback : value;
}

export const testValues = {
  baseUiUrl: read('BASE_UI_URL', 'https://www.greencity.cx.ua/#/greenCity'),
  baseApiUrl: read('BASE_API_URL', 'https://api-greencity.azurewebsites.net/'),
  userEmail: read('USER_EMAIL'),
  userName: read('USER_NAME'),
  userPassword: read('USER_PASSWORD'),
  adminEmail: read('ADMIN_EMAIL'),
  adminName: read('ADMIN_NAME'),
  adminPassword: read('ADMIN_PASSWORD'),
};
