using System;
using System.Collections.Generic;
using System.Text;

namespace Modeli
{
    public class Kasa
    {
        public int id { get; set; }
        public double stanje_kase { get; set; }
        public bool aktivna { get; set; }

        //obavlja rad
        public int radnikId { get; set; }
        public Radnik radnik { get; set; }
    }
}
