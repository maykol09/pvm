using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PVM_DATA.Entities
{
    public class ActionHistory
    {
        public int post_action_id { get; set; }
        public int post_id { get; set; }
        public string staff_type { get; set; }
        public string action_step { get; set; }
        public string action_date { get; set; }
        public int action_id { get; set; }
        public string action_remarks { get; set; }
        public string per_remarks { get; set; }
        public string action_stage { get; set; }
        public string next_step { get; set; }
        public Boolean for_per_only { get; set; }
        public string action { get; set; }
        public Boolean is_active { get; set; }

        
    }
}