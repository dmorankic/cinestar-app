﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modeli.EmailConfiguration
{
    public class EmailConfig
    {
        public string from { get; set; }
        public string smtpServer { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int port { get; set; }
    }
}
