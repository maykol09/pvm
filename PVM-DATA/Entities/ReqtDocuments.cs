using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PVM_DATA.Entities
{
    public class ReqtDocuments
    {
        public int post_reqt_id { get; set; }
        public int post_id { get; set; }
        public string reqt_date { get; set; }
        public int reqt_id { get; set; }
        public string reqt_remarks { get; set; }
        public string user_name { get; set; }
        public string action { get; set; }
    }
}