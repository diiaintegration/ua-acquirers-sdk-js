export type Base64 = string;

export type PrivateKeyConfig = {
  filePath: string;
  password: string;
  certificates: string[];
  CACommonName: string;
};

export type CryptoLibraryConfiguration = {
  CAs: string;  // Шлях до файлу з CA (наприклад, 'settings/CAs.Test.json')
  CACertificates: string[];  // Масив шляхів до сертифікатів (наприклад, ['certificates/CACertificates.Test.p7b'])
  PrivateKey: PrivateKeyConfig;  // Конфігурація для приватного ключа
};

export enum UaPkiResult {
  Success
}
