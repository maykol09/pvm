using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PVM_DATA.Entities
{
    public class User
    {
        public int lib_user_level_id { get; set; }
        public string user_name { get; set; }
        public string name { get; set; }
        public Boolean is_active { get; set; }
        public string updated_by { get; set; }
        public string action { get; set; }
    }
}