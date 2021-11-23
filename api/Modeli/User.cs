using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Modeli
{
    public class User
    {
        public int Id { get; set; }
        public string ime_prezime { get; set; }
        public string username { get; set; }

        [EmailAddress]
        public string email { get; set; }
        public DateTime b_date { get; set; }
        public string password { get; set; }

        public int broj_telefona { get; set; }
    }
}
