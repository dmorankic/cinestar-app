using System;
using System.Collections.Generic;
using System.Text;

namespace Modeli
{
    public class Kino
    {
        public int id { get; set; }
        public string naziv { get; set; }
        public int gradId { get; set; }
        public Grad grad { get; set; }
    }
}
