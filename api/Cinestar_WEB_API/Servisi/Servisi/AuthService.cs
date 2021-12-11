using dataBase;
using IdentityModel.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Modeli;
using Modeli.AuthModeli;
using Servisi.IServisi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Servisi.Servisi
{
    public class AuthService :IAuthService
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;
        private DiscoveryDocumentResponse _discDocument { get; set; }

        //public CrudRepo(DB_Context db,IMapper mapper,IConfiguration config,ILogger logger):base(db,mapper, config)
        public AuthService(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context)
        {
            using (var client = new HttpClient())
            {
                _discDocument = client.GetDiscoveryDocumentAsync("https://auth-server.p2098.app.fit.ba/.well-known/openid-configuration").Result;
            }
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }
        public async Task<TokenResponse> GetToken(string scope)
        {
            // var IdentityServerSettings = config["IdentityServerSettings"];
            using (var client = new HttpClient())
            {
                var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
                {
                    Address = _discDocument.TokenEndpoint,
                    ClientId = "web.client",
                    Scope = scope,
                    ClientSecret = "SuperSecretPassword",
                    GrantType = "client_credentials"

                });
                if (tokenResponse.IsError)
                {
                    throw new Exception("Token Error");
                }
                return tokenResponse;
            }
        }
        public LoginRespons Login(LoginRequest request)
        {
            User user = null;

            try
            {
                user = db_context.korisnici.Where(x => x.username == request.username && x.password == request.password).First();
            }
            catch (Exception err)
            {
                user = null;
            }

            var respons = new LoginRespons();

            if (user != null)
            {
                var ids4_token_respons = GetToken("cinestar_api.read");
                respons.issued = DateTime.Now;
                respons.token = ids4_token_respons.Result.AccessToken;
                respons.expiresIn = ids4_token_respons.Result.ExpiresIn;
                respons.error = "x";
                respons.id = user.Id;
            }
            else
            {
                respons.error = "Username or password were incorrect. Please try entering your credentials again.";
            }

            return respons;
        }

        public string Register(RegisterRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
