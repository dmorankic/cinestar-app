using IdentityModel.Client;
using Modeli.AuthModeli;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servisi.IServisi
{
    public interface IAuthService
    {
        LoginRespons Login(LoginRequest request);
        Task<TokenResponse> GetToken(string scope);
        string Register(RegisterRequest request);
        Task<string> ConfirmUser(ConfirmationRequest req);
    }
}
