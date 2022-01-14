using dataBase;
using IdentityModel.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Modeli;
using Modeli.AuthModeli;
using Modeli.MailModels;
using Servisi.IServisi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Servisi.Servisi
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;
        private readonly IEmailService emailService;
        private readonly KorisnikServis userService;

        private DiscoveryDocumentResponse _discDocument { get; set; }

        //public CrudRepo(DB_Context db,IMapper mapper,IConfiguration config,ILogger logger):base(db,mapper, config)
        public AuthService(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context, IEmailService emailService, KorisnikServis userService)
        {
            using (var client = new HttpClient())
            {
                _discDocument = client.GetDiscoveryDocumentAsync("https://localhost:44376/.well-known/openid-configuration").Result;
            }
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
            this.emailService = emailService;
            this.userService = userService;
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

                //user = db_context.radnici.Where(x => x.username == request.username && x.password == request.password).First(); provjera za radnika

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

        public string Register(RegisterRequest req)
        {
            var user = new Korisnik()
            {
                ime_prezime = req.ime_prezime,
                username = req.username,
                password = req.password,
                email = req.email,
                b_date = req.bdate,
                confirmed = 0,
                gradId = req.cityId
            };

            userService.Insert(user);


            try
            {
                emailService.SendEmail(new Mail(req.email, "confirmation mail from cinestar", "This is you confirmation token : 225643", user.ime_prezime));
                return $"{user.Id}";
            }
            catch (Exception err)
            {
                return err.InnerException.Message;
            }
        }

        public async Task<string> ConfirmUser(ConfirmationRequest req)
        {

            var users = db_context.korisnici.Where(x => x.Id == req.userId);
            var korisnik = users.First();
            if (korisnik.confirmed == 1)
                return System.Text.Json.JsonSerializer.Serialize(new { message = "User already confirmed." });


            if (users.Count() != 0)
            {
                var confCode = db_context.confirmMailKorisnik.Where(x => x.id == korisnik.confMailXkorisniciId).First().issuedConfCode;

                if (req.userCode == confCode)
                {
                    korisnik.confirmed = 1;

                    db_context.SaveChanges();

                    return System.Text.Json.JsonSerializer.Serialize(new { message = "You have confirmed user sucessfully"});
                }
                else
                    return System.Text.Json.JsonSerializer.Serialize(new { message = "Entered code doesnt match  " + req.userCode + "  " + confCode });

            }
            else
            {
                return System.Text.Json.JsonSerializer.Serialize(new { message = "User doesnt match, somthing went wrong!" });

            }
        }
    }
}
