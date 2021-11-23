using System;
using System.Collections.Generic;
using System.Text;

namespace Modeli
{
    public class Film
    {
        public int id { get; set; }
        public string naziv { get; set; }
        public string zanr { get; set; }
        public byte[] slika { get; set; }
        public int detaljiFilmaID { get; set; }
        public DetaljiFilma detaljiFilma { get; set; }
    }
}
