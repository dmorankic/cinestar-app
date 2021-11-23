using System;
using System.Collections.Generic;
using System.Text;

namespace Modeli
{
    public class Proizvod
    {
        public int id { get; set; }
        public string porcija { get; set; }
        public string naziv { get; set; }
        public double cijena { get; set; }

        //potjece iz stavke ponude
        public int stavkaPonudeId { get; set; }
        public StavkaPonude stavkaPonude { get; set; }
    }
}
