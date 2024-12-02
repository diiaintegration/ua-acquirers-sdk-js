import { Base64 } from "../diia-client-common/types";
import { ICryptoLibraryService } from "./CryptoService";
import { log } from "../diia-client-sdk/utils";
import { EUSignCP } from './libs/euscpm';
import fs from 'fs/promises';
import path from 'path';

export class CryptoIiTService implements ICryptoLibraryService {
    private g_euSign: any;
    private g_context: any = null;
    private g_pkContext: any = null;
    private config: any;

    constructor() {
        this.g_euSign = EUSignCP();
        this.loadConfig()
            .then(() => this.initializeLibrary())
            .catch(err => log.error("Error loading config:", err));
    }

    private async loadConfig() {
        const configPath = path.resolve(__dirname, 'config.json');
        this.config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
    }

    private initializeLibrary() {
        if (!this.g_euSign.IsInitialized()) {
            this.g_euSign.Initialize();
        }

        if (this.g_euSign.DoesNeedSetSettings()) {
            const CASettings = this.config.defaultCASettings;
            const CAs = this.config.CAs;

            this.setSettings(CAs, CASettings);
            this.loadCertificates(this.config.CACertificates);
        }

        if (!this.g_context) {
            this.g_context = this.g_euSign.CtxCreate();
        }
    }

    private setSettings(CAs: any, CASettings: any) {
        const offline = !CASettings || !CASettings.address;
        const useOCSP = !offline && CASettings.ocspAccessPointAddress;
        const useCMP = !offline && CASettings.cmpAddress;

        const fileStoreSettings = this.g_euSign.CreateFileStoreSettings();
        fileStoreSettings.SetPath('');
        fileStoreSettings.SetSaveLoadedCerts(false);
        this.g_euSign.SetFileStoreSettings(fileStoreSettings);

        const modeSettings = this.g_euSign.CreateModeSettings();
        modeSettings.SetOfflineMode(offline);
        this.g_euSign.SetModeSettings(modeSettings);

        const proxySettings = this.g_euSign.CreateProxySettings();
        this.g_euSign.SetProxySettings(proxySettings);

        const tspSettings = this.g_euSign.CreateTSPSettings();
        tspSettings.SetGetStamps(!offline);
        if (CASettings.tspAddress) {
            tspSettings.SetAddress(CASettings.tspAddress);
            tspSettings.SetPort(CASettings.tspAddressPort || '80');
        }
        this.g_euSign.SetTSPSettings(tspSettings);

        if (useOCSP) {
            const ocspSettings = this.g_euSign.CreateOCSPSettings();
            ocspSettings.SetUseOCSP(true);
            ocspSettings.SetBeforeStore(true);
            ocspSettings.SetAddress(CASettings.ocspAccessPointAddress);
            ocspSettings.SetPort(CASettings.ocspAccessPointPort || '80');
            this.g_euSign.SetOCSPSettings(ocspSettings);
        }
    }

    private async loadCertificates(certificates: string[]) {
        for (const certPath of certificates) {
            const data = await fs.readFile(certPath);
            if (certPath.endsWith('.p7b')) {
                this.g_euSign.SaveCertificates(data);
            } else {
                this.g_euSign.SaveCertificate(data);
            }
        }
    }

    public async signData(data: Uint8Array): Promise<Base64> {
        try {
            this.initializeLibrary();

            const signedData = this.g_euSign.SignData(
                this.g_pkContext,
                data,
                true
            );

            return this.g_euSign.Base64Encode(signedData);
        } catch (error) {
            log.error("Signing error:", error);
            throw error;
        }
    }

    public async loadPrivateKey() {
        const privateKey = this.config.privateKey;
        const pKeyData = await fs.readFile(privateKey.filePath);

        this.g_pkContext = this.g_euSign.CtxReadPrivateKeyBinary(
            this.g_context,
            pKeyData,
            privateKey.password
        );

        await this.loadCertificates(privateKey.certificates);
    }

    // Реалізація методу decrypt
    public decrypt(encryptedData: Buffer | Base64): Base64 {
        try {
            const decryptedData = this.g_euSign.DecryptData(this.g_pkContext, encryptedData);
            return this.g_euSign.Base64Encode(decryptedData);
        } catch (error) {
            log.error("Decryption error:", error);
            throw error;
        }
    }

    // Реалізація методу getHashOfItem
    public getHashOfItem(payload: Base64): Base64 {
        try {
            const hashedData = this.g_euSign.GetHash(payload);
            return this.g_euSign.Base64Encode(hashedData);
        } catch (error) {
            log.error("Hashing error:", error);
            throw error;
        }
    }
}
