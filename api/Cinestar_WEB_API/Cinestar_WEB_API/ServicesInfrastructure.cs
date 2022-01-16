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
            //the power of generics
            services.AddTransient(typeof(IBaseService<,>),typeof(BaseService<,>));
            services.AddTransient<KorisnikServis>();
            services.AddTransient<IBaseService <Racun,object>,RacunService>();
            services.AddTransient<IBaseService <Radnik,object>,RadnikService>();
            services.AddTransient<IBaseService <Korisnik,object>,KorisnikServis>();
            services.AddTransient<IBaseService <Karta,object>,KartaService>();
            services.AddTransient<IBaseService <Ponuda,object>,PonudaServis>();
            services.AddTransient<IBaseService <Proizvod,object>,ProizvodServis>();
            services.AddTransient<IBaseService <Kino,object>,KinoService > ();
            services.AddTransient<IBaseService <Kasa,object>,KasaService> ();
            
            //dependency injection for database context
            services.AddTransient<ApplicationDbContext>();

            //loging service registration
            services.AddTransient<ILogger,Logger>();
            services.AddTransient<ILoggerFactory,LoggerFactory>();

            services.AddSingleton<IAuthService,AuthService>();
            services.AddSingleton<IEmailService, EmailService>();

            services.AddSingleton<ReportingService>();



            return services;
        }
    }
}
