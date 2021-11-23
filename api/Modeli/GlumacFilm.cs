using System;
using System.Collections.Generic;
using System.Text;

namespace Modeli
{
    public class GlumacFilm
    {
        public int id { get; set; }
        public int glumacId { get; set; }
        public Glumac glumac { get; set; }
        public int filmId { get; set; }
        public Film film { get; set; }
    }
}
