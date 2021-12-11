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
        string Register(RegisterRequest request);
    }
}
