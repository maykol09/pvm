using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PVM_DATA.Extension
{
    public static class CryptoExtension
    {
        public static string Encrypt(this string target)
        {
            return new CryptLib.CryptLib().Encrypt3DES(target);
        }
        public static string Decrypt(this string target)
        {
            return new CryptLib.CryptLib().Decrypt3DES(target);
        }
    }
}