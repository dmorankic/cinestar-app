﻿using dataBase;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Modeli;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servisi.Servisi
{
    public class RadnikService : BaseService<Radnik, object>
    {
        private readonly IConfiguration config;
        private readonly ILogger logger;
        private readonly ApplicationDbContext db_context;

        public RadnikService(IConfiguration _config, ILogger _logger, ApplicationDbContext _db_context) : base(_config, _logger, _db_context)
        {
            //this.db = db;
            this.config = _config;
            this.logger = _logger;
            db_context = _db_context;
        }

        public override Radnik Update(int id, Radnik _user)
        {
            var radnik = db_context.radnici.Find(id);

            if (radnik == null)
                return null;

            radnik.ime_prezime = _user.ime_prezime;
            radnik.username = _user.username;
            radnik.email = _user.email;
            radnik.password = _user.password;
            radnik.broj_telefona = _user.broj_telefona;
            radnik.b_date = _user.b_date;
            radnik.strucnaSprema = _user.strucnaSprema;
            radnik.datum_uposljenja = _user.datum_uposljenja;
            radnik.spol = _user.spol;
            radnik.plata = _user.plata;
            radnik.jmbg = _user.jmbg;
            if (_user.vrstaRadnikaId != 0)
            {
                radnik.vrstaRadnikaId = _user.vrstaRadnikaId;
                radnik.vrstaRadnika = db_context.vrstaRadnika.FirstOrDefault(x => x.id == radnik.vrstaRadnikaId);
            }

            radnik.gradId = _user.gradId;
            radnik.grad = db_context.grad.Find(_user.gradId);

            db_context.SaveChanges();

            return radnik;
        }

        public override Radnik Insert(Radnik user)
        {
            user.vrstaRadnika = db_context.vrstaRadnika.Find(user.vrstaRadnikaId);

            user.grad = db_context.grad.Find(user.gradId);

            db_context.radnici.Add(user);

            db_context.SaveChanges();

            return user;

        }

    }
}
