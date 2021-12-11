using dataBase;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Modeli;
using Servisi.IServisi;
using Servisi.Servisi;

namespace Cinestar_WEB_API
{
    public static class ServicesInfrastructure
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            //models services registration
            services.AddTransient<IBaseService<Korisnik,object>,KorisnikServis>();
            services.AddTransient<IBaseService<Radnik,object>,RadnikService>();
            services.AddTransient<IBaseService<Grad,object>,GradServis>();
            services.AddTransient<IBaseService<VrstaRadnika,object>,UlogeServis>();
            services.AddTransient<IBaseService<Ponuda, object>, PonudaServis>();
            services.AddTransient<IBaseService<Rad, object>, RadService>();
            services.AddTransient<IBaseService<Kasa, object>, KasaService>();
            services.AddTransient<IBaseService<Kino, object>, KinoService>();
            services.AddTransient<IBaseService<Proizvod, object>, ProizvodServis>();
            services.AddTransient<IBaseService<StavkaPonude, object>, StavkaPonudeServis>();
            services.AddTransient<IBaseService<Racun, object>, RacunService>();
            services.AddTransient<IBaseService<Karta, object>, KartaService>();
            services.AddTransient<IBaseService<Dvorana, object>, DvoranaService>();
            services.AddTransient<IBaseService<Sjediste, object>, SjedisteService>();

            //dependency injection for database context
            services.AddTransient<ApplicationDbContext>();

            //loging service registration
            services.AddTransient<ILogger,Logger>();
            services.AddTransient<ILoggerFactory,LoggerFactory>();



            //register auth services
            services.AddSingleton<IAuthService, AuthService>();

            return services;
        }
    }
}
