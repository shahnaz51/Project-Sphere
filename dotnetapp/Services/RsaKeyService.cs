using System;
using System.Security.Cryptography;
using System.Text;

namespace dotnetapp.Services
{
    public class RsaKeyService
    {
        private readonly RSA _rsa;

        public RsaKeyService()
        {
            // Generate a 2048-bit RSA key pair once at app startup
            // Same key pair is reused for the app's lifetime (Singleton DI)
            _rsa = RSA.Create(2048);
        }

        /// <summary>
        /// Returns the PUBLIC key as Base64 (SPKI format).
        /// Angular fetches this to encrypt passwords.
        /// Safe to expose publicly.
        /// </summary>
        public string GetPublicKey()
        {
            return Convert.ToBase64String(_rsa.ExportSubjectPublicKeyInfo());
        }

        /// <summary>
        /// Decrypts a Base64 encrypted string using the PRIVATE key.
        /// Only backend can do this — private key never leaves server.
        /// </summary>
        public string Decrypt(string encryptedBase64)
        {
            try
            {
                var encryptedBytes = Convert.FromBase64String(encryptedBase64);
                var decryptedBytes = _rsa.Decrypt(encryptedBytes, RSAEncryptionPadding.Pkcs1);
                return Encoding.UTF8.GetString(decryptedBytes);
            }
            catch (Exception ex)
            {
                throw new Exception("Password decryption failed: " + ex.Message);
            }
        }
    }
}